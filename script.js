function registerUser(e) {
  e.preventDefault();
  // Mobile is the new primary key. OTP is hardcoded as '1234'.
  const mobile = document.getElementById('regMobile').value;
  const otp = '1234'; 

  // Store user data. Default name 'User' is used since the name field was removed from register.html
  localStorage.setItem('user', JSON.stringify({mobile, password: otp, name: 'User'})); 
  alert(`Registration successful! Your OTP is: ${otp}. Please login using your Mobile Number.`);
  window.location.href = 'login.html';
  return false;
}

function loginUser(e) {
  e.preventDefault();
  // Get input elements
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
          alert(`OTP sent to ${mobile}! (Demo OTP is: ${sentOtp})`);
          
          // Show OTP fields
          otpInput.placeholder = 'Enter OTP';
          otpInput.type = 'text';
          otpInput.style.display = 'block'; 
          otpLabel.style.display = 'block'; 
          
          // Update UI
          promptText.style.display = 'none'; 
          loginButton.textContent = 'Verify OTP & Login'; 
          mobileInput.readOnly = true; 
      } else {
          alert('User not registered or Invalid Mobile Number! Please register first.');
      }
      return false; 
  }
  
  // --- STEP 2: Verify OTP ---
  const enteredOtp = otpInput.value;
  if(user && user.mobile === mobile && user.password === enteredOtp) {
    alert('Login successful!');
    window.location.href = 'cafeteria.html';
  } else {
    alert('Invalid OTP or Mobile Number!');
    // Resetting UI for a new attempt
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
  // localStorage.removeItem('user'); // Optional: uncomment this to clear session on logout
}

// --- PROFILE FUNCTIONS ---

function loadProfile() {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const profile = JSON.parse(localStorage.getItem('profile')) || {};
    
    if (document.getElementById('profileForm')) {
        // Load Name from profile or default user object
        document.getElementById('profileName').value = profile.name || user.name || '';
        
        // Load Mobile from primary user object and set readOnly
        document.getElementById('profileMobile').value = user.mobile || ''; 
        document.getElementById('profileMobile').readOnly = true; 
        
        // Load other details
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
        mobile: document.getElementById('profileMobile').value, // Mobile is read-only, we just save it
        email: document.getElementById('profileEmail').value, 
        dob: document.getElementById('profileDOB').value,
        gender: document.getElementById('profileGender').value
    };

    localStorage.setItem('profile', JSON.stringify(updatedProfileData));
    
    // Update name in primary user object
    primaryUser.name = updatedProfileData.name;
    localStorage.setItem('user', JSON.stringify(primaryUser));

    alert('Profile Updated Successfully!');
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
});