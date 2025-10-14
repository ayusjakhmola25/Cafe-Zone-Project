// --- OTP LOGIN LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    // यह कोड सिर्फ लॉगिन पेज पर चलेगा
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLoginFlow);
    }

    // यह कोड सिर्फ प्रोफाइल पेज पर चलेगा
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
});

let isOtpSent = false;
const FAKE_OTP = "123456"; // डेमो के लिए नकली OTP

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

        // असली OTP नहीं भेजा जा रहा है, सिर्फ एक नकली OTP अलर्ट में दिखाया जा रहा है।
        alert(`OTP sent to ${mobileNumber}. \n\nFor this demo, your OTP is: ${FAKE_OTP}`);

        // OTP फील्ड दिखाएं
        otpInput.style.display = 'block';
        otpLabel.style.display = 'block';
        mobileInput.readOnly = true; // मोबाइल नंबर को अब बदला नहीं जा सकता
        loginBtn.textContent = 'Verify & Login';
        
        isOtpSent = true;

    } else {
        // --- स्टेप 2: OTP वेरिफाई करें ---
        const enteredOTP = otpInput.value;

        if (enteredOTP === FAKE_OTP) {
            alert('Login successful!');
            window.location.href = 'cafeteria.html'; // लॉगिन के बाद होम पेज पर जाएं
        } else {
            alert('Invalid OTP! Please try again.');
        }
    }
}


// --- आपके बाकी के फंक्शन ---

function registerUser(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  localStorage.setItem('user', JSON.stringify({name, email, password}));
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
        document.getElementById('profileMobile').value = profile.mobile || '';
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