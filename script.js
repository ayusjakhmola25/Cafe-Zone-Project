function registerUser(e) {
  e.preventDefault();
  // Get mobile number
  const mobile = document.getElementById('regMobile').value;
  // Hardcoded OTP for demo (matches the value in the hidden input)
  const otp = '1234'; 

  // Store in localStorage
  localStorage.setItem('user', JSON.stringify({mobile, password: otp, name: 'User'})); 
  alert(`Registration successful! आपका OTP है: ${otp}। कृपया अपने Mobile Number का उपयोग करके लॉग इन करें।`);
  window.location.href = 'login.html';
  return false;
}

function loginUser(e) {
  e.preventDefault();
  // Get mobile number
  const mobileInput = document.getElementById('loginMobile');
  const mobile = mobileInput.value;
  const otpInput = document.getElementById('loginPassword'); 
  const otpLabel = document.getElementById('otp-label');
  const loginButton = document.querySelector('.login-button');
  const promptText = document.getElementById('otp-prompt');
  
  const user = JSON.parse(localStorage.getItem('user'));

  // --- STEP 1: Simulate sending OTP ---
  if (!otpInput.value) {
      if(user && user.mobile === mobile) {
          const sentOtp = user.password;
          alert(`OTP आपके ${mobile} पर भेजा गया! (डेमो के लिए OTP है: ${sentOtp})`);
          
          otpInput.placeholder = 'OTP दर्ज करें';
          otpInput.type = 'text';
          otpInput.style.display = 'block'; 
          otpLabel.style.display = 'block'; 
          
          promptText.style.display = 'none'; 
          loginButton.textContent = 'OTP सत्यापित करें और Login करें';
          mobileInput.readOnly = true; 
      } else {
          alert('User पंजीकृत नहीं है या Mobile Number अमान्य है!');
      }
      return false; 
  }
  
  // --- STEP 2: Verify OTP ---
  const enteredOtp = otpInput.value;
  if(user && user.mobile === mobile && user.password === enteredOtp) {
    alert('Login सफल!');
    window.location.href = 'cafeteria.html';
  } else {
    alert('OTP या Mobile Number अमान्य है!');
    // Resetting for a new attempt
    mobileInput.readOnly = false;
    otpInput.value = '';
    otpInput.style.display = 'none';
    otpLabel.style.display = 'none';
    loginButton.textContent = 'Send OTP';
    promptText.style.display = 'block';
  }
  return false;
}

function logout() {
  alert('Logged out successfully!');
}

// --- PROFILE FUNCTIONS (NO CHANGE) ---

function loadProfile() {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const profile = JSON.parse(localStorage.getItem('profile')) || {};
    
    if (document.getElementById('profileForm')) {
        document.getElementById('profileName').value = profile.name || user.name || '';
        document.getElementById('profileMobile').value = user.mobile || ''; 
        document.getElementById('profileMobile').readOnly = true; 
        document.getElementById('profileEmail').value = profile.email || ''; 
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
        email: document.getElementById('profileEmail').value, 
        dob: document.getElementById('profileDOB').value,
        gender: document.getElementById('profileGender').value
    };

    localStorage.setItem('profile', JSON.stringify(updatedProfileData));
    
    primaryUser.name = updatedProfileData.name;
    primaryUser.mobile = updatedProfileData.mobile;
    localStorage.setItem('user', JSON.stringify(primaryUser));

    alert('Profile Updated Successfully!');
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
});