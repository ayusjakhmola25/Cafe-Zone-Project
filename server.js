// server.js (Node.js/Express Backend - Final Code)

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const app = express();
const PORT = 3000;

const JWT_SECRET = 'YOUR_SUPER_SECURE_MYSQL_SECRET_KEY';

// Middleware
app.use(express.json()); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// --- MySQL Connection Pool ---
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'ayush123', // <--- यहां अपना MySQL पासवर्ड डालें
    database: 'fusioncafedb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

db.getConnection()
    .then(connection => {
        console.log('MySQL connected successfully to fusioncafedb');
        connection.release();
    })
    .catch(err => {
        console.error('MySQL connection failed:', err.message);
        process.exit(1);
    });

// -------------------------------------------------------------------
// --- API: User Registration (POST /api/register) ---
app.post('/api/register', async (req, res) => {
    const { name, mobile, email, password } = req.body;
    if (!name || !mobile || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const insertQuery = `INSERT INTO users (name, mobile, email, password) VALUES (?, ?, ?, ?)`;
        await db.execute(insertQuery, [name, mobile, email, hashedPassword]);
        res.status(201).json({ message: 'Registration successful. Please login.' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'User already exists with this mobile or email.' });
        }
        console.error('Registration Error:', error.message);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// -------------------------------------------------------------------
// --- API: OTP Bhejna (POST /api/send-otp) ---
app.post('/api/send-otp', async (req, res) => {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ message: 'Mobile number is required.' });

    try {
        const [rows] = await db.execute('SELECT id FROM users WHERE mobile = ?', [mobile]);
        if (!rows.length) return res.status(404).json({ message: 'User not registered.' });

        // 1. 6-digit OTP generate karein
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
        const expiryTime = new Date(new Date().getTime() + 5 * 60000); // 5 minutes validity
        
        // 2. OTP aur expiration database mein store karein
        await db.execute(
            'UPDATE users SET otp_code = ?, otp_expiry = ? WHERE mobile = ?',
            [otp, expiryTime, mobile]
        );

        // 3. OTP ko seedhe response mein bhej dein (Front-end Page Message ke liye)
        res.json({ 
            message: `OTP sent successfully. Your OTP is: ${otp}`, 
            otp: otp 
        }); 

    } catch (error) {
        console.error('OTP Send Error:', error.message);
        res.status(500).json({ message: 'Failed to send OTP. Server error.' });
    }
});

// -------------------------------------------------------------------
// --- API: OTP Verify karke Login (POST /api/login-with-otp) ---
app.post('/api/login-with-otp', async (req, res) => {
    const { mobile, otp } = req.body;

    try {
        const [rows] = await db.execute('SELECT id, name, mobile, email, otp_code, otp_expiry FROM users WHERE mobile = ?', [mobile]);
        const user = rows[0];

        // 1. Verification
        if (!user || user.otp_code !== otp || new Date() > new Date(user.otp_expiry)) {
            // Agar verification fail ho to OTP clear kar dein
            if (user) {
                 await db.execute('UPDATE users SET otp_code = NULL, otp_expiry = NULL WHERE mobile = ?', [mobile]);
            }
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        // 2. Successful login - OTP clear karein
        await db.execute('UPDATE users SET otp_code = NULL, otp_expiry = NULL WHERE mobile = ?', [mobile]);

        // 3. LOGIN HISTORY में एंट्री करें और COUNT निकालें
        await db.execute(`INSERT INTO login_history (user_mobile) VALUES (?)`, [mobile]);
        const [countRows] = await db.execute(`SELECT COUNT(*) AS loginCount FROM login_history WHERE user_mobile = ?`, [mobile]);
        const loginCount = countRows[0].loginCount;

        // 4. JWT generate karein
        const payload = { user: { id: user.id, name: user.name, mobile: user.mobile } };
        
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    token, 
                    name: user.name, 
                    mobile: user.mobile, 
                    email: user.email, 
                    loginCount: loginCount, 
                    message: 'Login successful' 
                }); 
            }
        );

    } catch (error) {
         console.error('OTP Login Error:', error.message);
         res.status(500).json({ message: 'Server error during login verification.' });
    }
});


// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});