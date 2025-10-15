

document.addEventListener('DOMContentLoaded', () => {
    
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLoginFlow);
    }

    
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
});

let isOtpSent = false;
let currentOTP = null; // Store the generated OTP

/**
 * Generates a random 5-digit number for the OTP.
 * This simulates the random number generation.
 * @returns {string} The 5-digit OTP as a string.
 */
function generateRandomOTP() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

/**
 * Checks if the given mobile number is registered.
 * In a real app, this would be an API call to the server.
 * @param {string} mobileNumber - The 10-digit mobile number to check.
 * @returns {boolean} True if registered, false otherwise.
 */
function isMobileRegistered(mobileNumber) {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    // Check if the saved user data has the mobile number field, and it matches the entered number
    // NOTE: This simple check works for only ONE registered user in localStorage.
    // For a real application, 'users' would be an array of objects.
    
    // For this demo (which saves only one user):
    return user.mobile === mobileNumber;
}


function handleLoginFlow(e) {
    e.preventDefault(); // पेज को रीलोड होने से रोकता है

    const mobileInput = document.getElementById('loginMobile');
    const otpInput = document.getElementById('loginOTP');
    const otpLabel = document.getElementById('otp-label');
    const loginBtn = document.getElementById('loginBtn');

    if (!isOtpSent) {
        // --- स्टेप 1: OTP भेजें ---
        const mobileNumber = mobileInput.value;
        if (mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
            alert('Please enter a valid 10-digit mobile number.');
            return;
        }

        // 🎯 NEW CHECK: Check if the mobile number is registered
        if (!isMobileRegistered(mobileNumber)) {
            alert('Invalid Mobile Number! This number is not registered. Please register first.');
            return; // Stop the flow
        }
        
        // Generate the 5-digit random OTP
        currentOTP = generateRandomOTP(); 
        
        // OTP अलर्ट में दिखाएं
        alert(`OTP sent to ${mobileNumber}. \n\nFor this demo, your **5-digit** OTP is: ${currentOTP}`);

        // OTP फील्ड दिखाएं
        otpInput.style.display = 'block';
        otpLabel.style.display = 'block';
        mobileInput.readOnly = true; // मोबाइल नंबर को अब बदला नहीं जा सकता
        loginBtn.textContent = 'Verify & Login';
        
        isOtpSent = true;

    } else {
        // --- स्टेप 2: OTP वेरिफाई करें ---
        const enteredOTP = otpInput.value;

        // Verify against the generated OTP
        if (enteredOTP === currentOTP) { 
            alert('Login successful!');
            window.location.href = 'cafeteria.html'; // लॉगिन के बाद होम पेज पर जाएं
        } else {
            alert('Invalid OTP! Please try again.');
        }
    }
}


// --- बाकी के फ़ंक्शन (Registration, Logout, Profile) ---

function registerUser(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  // Mobile field check added (Required as per your final HTML)
  const mobile = document.getElementById('regMobile') ? document.getElementById('regMobile').value : ''; 
  const password = document.getElementById('regPassword').value;

  // Save Name, Email, Mobile, and Password
  // NOTE: This overwrites the previous user. For a multi-user demo, you would use an array.
  localStorage.setItem('user', JSON.stringify({name, email, mobile, password}));
  alert('Registration successful! Please login.');
  window.location.href = 'login.html';
  return false;
}

function logout() {
  alert('Logged out successfully!');
}

function loadProfile() {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const profile = JSON.parse(localStorage.getItem('profile')) || {};
    
    if (document.getElementById('profileForm')) {
        document.getElementById('profileName').value = profile.name || user.name || '';
        document.getElementById('profileMobile').value = profile.mobile || user.mobile || ''; 
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
        mobile: document.getElementById('profileMobile').value,
        dob: document.getElementById('profileDOB').value,
        gender: document.getElementById('profileGender').value
    };

    localStorage.setItem('profile', JSON.stringify(updatedProfileData));
    
    primaryUser.name = updatedProfileData.name;
    localStorage.setItem('user', JSON.stringify(primaryUser));

    alert('Profile Updated Successfully!');
    return false;
}