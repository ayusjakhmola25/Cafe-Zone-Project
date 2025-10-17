// script.js (FINAL INTEGRATED CODE)

// --- CONFIGURATION ---
const BACKEND_URL = 'http://localhost:3000'; 


// DOM Elements (login.html)
const loginForm = document.getElementById('otpLoginForm');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const loginBtn = document.getElementById('loginBtn');
const otpSection = document.getElementById('otpSection');
const timerDisplay = document.getElementById('timer');
const otpMessageDiv = document.getElementById('otpMessage'); 

// DOM Elements (cafeteria.html Modal)
const welcomeModal = document.getElementById('welcomeModal');
const modalWelcomeText = document.getElementById('modalWelcomeText');
const modalMessage = document.getElementById('modalMessage');

let timerInterval;

// --- UTILITY FUNCTIONS FOR MODAL ---
function closeModal() {
    if (welcomeModal) {
        welcomeModal.style.display = 'none';
    }
}

// NOTE: redirectToCafeteria is slightly adjusted to handle both modal button and direct redirect
function redirectToCafeteria() {
    closeModal();
    // This function is generally for redirecting or continuing, but since it's on cafeteria.html, 
    // we assume it means closing the modal and continuing on the same page. 
    // If running from login.html, the main login function handles the redirect.
    // We will keep this function simple for modal closing.
}

function showModal(name, loginCount) {
    if (welcomeModal) {
        // Example: 1st, 2nd, 3rd, 4th
        let suffix = 'th';
        if (loginCount === 1) suffix = 'st';
        else if (loginCount === 2) suffix = 'nd';
        else if (loginCount === 3) suffix = 'rd';

        modalWelcomeText.textContent = `Welcome back, ${name}!`;
        modalMessage.innerHTML = ` Welcome to Fusion Cafe! The best offers are waiting for you.`;
        welcomeModal.style.display = 'flex'; // Use flex to center the modal content
    } 
}

// ------------------------------------

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    if (sendOtpBtn) {
        sendOtpBtn.addEventListener('click', sendOTP);
    }
    if (loginForm) {
        loginForm.addEventListener('submit', verifyOTPAndLogin);
    }
    
    // Check if the user just logged in and needs the modal
    checkLoginAndShowModal();
    
    // (Auxiliary listeners)
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', registerUser);
    }
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
        const profileForm = document.getElementById('profileForm');
        if(profileForm) {
            profileForm.addEventListener('submit', updateProfile);
        }
    }
});


// -------------------------------------------------------------------
// --- TIMER FUNCTIONS ---
function startTimer() {
    let timeLeft = 300; 
    const mobileInput = document.getElementById('loginMobile');

    const updateTimer = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = ('0' + timeLeft % 60).slice(-2);
        timerDisplay.textContent = `OTP expires in ${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'OTP Expired. Click "Send OTP" to resend.';
            mobileInput.disabled = false;
            sendOtpBtn.style.display = 'block';
            loginBtn.style.display = 'none';
            return;
        }
        timeLeft--;
    };
    
    clearInterval(timerInterval);
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}


// -------------------------------------------------------------------
// --- 1. SEND OTP (Page Message and Delay) ---
async function sendOTP() {
    const mobileInput = document.getElementById('loginMobile');
    const mobile = mobileInput.value;

    if (!mobile || mobile.length !== 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    otpMessageDiv.textContent = 'Sending OTP...';
    otpMessageDiv.style.color = '#007bff'; 

    try {
        const response = await fetch(`${BACKEND_URL}/api/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile })
        });

        const data = await response.json();

        if (response.ok) {
            otpMessageDiv.textContent = data.message; 
            otpMessageDiv.style.color = 'green';
            
            setTimeout(() => {
                otpSection.style.display = 'block';
                loginBtn.style.display = 'block';
                sendOtpBtn.style.display = 'none';
                mobileInput.disabled = true; 
                startTimer(); 
            }, 2000); 

        } else {
            otpMessageDiv.textContent = 'Error: ' + data.message;
            otpMessageDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Send OTP Error:', error);
        otpMessageDiv.textContent = 'Server connection error while sending OTP.';
        otpMessageDiv.style.color = 'red';
    }
}


// -------------------------------------------------------------------
// --- 2. VERIFY OTP AND LOGIN (FINAL STEP) ---
async function verifyOTPAndLogin(event) {
    event.preventDefault(); 
    
    const mobile = document.getElementById('loginMobile').value;
    const otp = document.getElementById('loginOTP').value;

    if (!mobile || !otp || otp.length !== 6) {
        alert('Please enter your mobile number and the 6-digit OTP.');
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api/login-with-otp`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile, otp })
        });

        const data = await response.json();

        if (response.ok) {
            clearInterval(timerInterval); 
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify({ name: data.name, mobile: data.mobile, email: data.email }));
            
            // Flag set करें और loginCount store करें
            localStorage.setItem('showWelcomeModal', 'true');
            localStorage.setItem('loginCount', data.loginCount); 
            
            // cafeteria.html पर रीडायरेक्ट करें
            window.location.href = 'cafeteria.html'; 
            
        } else {
            // गलत OTP पर स्पष्ट संदेश
            alert(`Login Failed: ${data.message || 'Invalid OTP. Please try again.'}`);
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert('Server connection error during login verification.');
    }
}


// -------------------------------------------------------------------
// --- 3. CHECK FOR MODAL ON CAFETERIA.HTML LOAD ---
function checkLoginAndShowModal() {
    // यह चेक करता है कि हम cafeteria.html पर हैं या नहीं
    if (window.location.pathname.includes('cafeteria.html')) {
        const user = JSON.parse(localStorage.getItem('user'));
        const loginCount = parseInt(localStorage.getItem('loginCount'), 10);
        
        if (localStorage.getItem('showWelcomeModal') === 'true' && user && loginCount) {
            
            showModal(user.name, loginCount); 
            
            // Flag हटा दें ताकि पेज रिफ्रेश होने पर मोडल बार-बार न दिखे
            localStorage.removeItem('showWelcomeModal');
            localStorage.removeItem('loginCount');
        }
    }
}

// -------------------------------------------------------------------
// --- AUXILIARY FUNCTIONS (Registration, Logout, Profile) ---
async function registerUser(e) {
    e.preventDefault();

    const name = document.getElementById('regName').value;
    const mobile = document.getElementById('regMobile').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (!name || !mobile || !email || !password) {
        alert('All fields are required for registration.');
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ name, mobile, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert('Registration Failed: ' + data.message);
        }
    } catch (error) {
        console.error('Registration Error:', error);
        alert('Could not connect to the server. Check backend status.');
    }
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    localStorage.removeItem('showWelcomeModal');
    localStorage.removeItem('loginCount');
    alert('Logged out successfully!');
    // Redirect handled by the HTML link to login.html
}

function loadProfile() {
    if (!localStorage.getItem('authToken')) {
        alert("Please login to view your profile.");
        window.location.href = 'login.html';
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const profile = JSON.parse(localStorage.getItem('profile')) || {}; 
    
    if (document.getElementById('profileForm')) {
        document.getElementById('profileName').value = profile.name || user.name || '';
        document.getElementById('profileMobile').value = user.mobile || ''; 
        document.getElementById('profileEmail').value = user.email || ''; 
        document.getElementById('profileDOB').value = profile.dob || '';
        document.getElementById('profileGender').value = profile.gender || '';
    }
}

function updateProfile(e) {
    e.preventDefault();
    const primaryUser = JSON.parse(localStorage.getItem('user')) || {};

    const updatedProfileData = {
        name: document.getElementById('profileName').value,
        mobile: primaryUser.mobile, 
        dob: document.getElementById('profileDOB').value,
        gender: document.getElementById('profileGender').value
    };

    localStorage.setItem('profile', JSON.stringify(updatedProfileData));
    
    primaryUser.name = updatedProfileData.name;
    localStorage.setItem('user', JSON.stringify(primaryUser));

    alert('Profile Updated Successfully!');
}