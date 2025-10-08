<<<<<<< HEAD
=======

>>>>>>> c83035d69fa602d4480c695cbbb87ddc7ae2de50
function registerUser(e) {
  e.preventDefault();
  // Removed name field as requested.
  const email = document.getElementById('regEmail').value;
  // Simulating an OTP-based registration. We'll store a hardcoded '1234' as the password/OTP for demo.
  const otp = '1234'; 

<<<<<<< HEAD
  // Store in localStorage for demo (no real backend). Only email and 'password' (OTP) needed.
  localStorage.setItem('user', JSON.stringify({email, password: otp, name: 'User'})); // Keeping a default 'name' for profile page consistency
  alert(`Registration successful! Your OTP is ${otp}. Please login.`);
  window.location.href = 'login.html';
  return false;
}

// Global variable to hold the sent OTP (for a two-step login)
let sentOtp = ''; 
=======
  localStorage.setItem('user', JSON.stringify({name, email, password}));
  alert('Registration successful! Please login.');
  
  
  showLoginPanel(); 
  

  document.getElementById('regName').value = '';
  document.getElementById('regEmail').value = '';
  document.getElementById('regPassword').value = '';
  
  return false;
}

>>>>>>> c83035d69fa602d4480c695cbbb87ddc7ae2de50

function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const otpInput = document.getElementById('loginPassword'); // Using the password field as the OTP input
  
  const user = JSON.parse(localStorage.getItem('user'));

  // --- STEP 1: Simulate sending OTP if OTP field is empty ---
  if (!otpInput.value) {
      if(user && user.email === email) {
          // Simulate sending a new OTP (using the stored password/OTP)
          sentOtp = user.password;
          alert(`OTP sent to ${email}! Check alert for the OTP: ${sentOtp}`);
          
          // Change input type and placeholder to reflect OTP
          otpInput.placeholder = 'Enter OTP';
          otpInput.type = 'text';
          otpInput.style.display = 'block'; // Ensure the OTP field is visible
          document.getElementById('otp-prompt').style.display = 'none'; // Hide the link to resend/register
          document.querySelector('.login-button').textContent = 'Verify OTP & Login';
      } else {
          alert('User not registered or Invalid Email ID!');
      }
      return false; // Prevent form submission and stay on the page
  }
  
  // --- STEP 2: Verify OTP ---
  const enteredOtp = otpInput.value;
  if(user && user.email === email && user.password === enteredOtp) {
    alert('Login successful!');
    window.location.href = 'cafeteria.html';
  } else {
    alert('Invalid OTP or Email ID!');
  }
  return false;
}

<<<<<<< HEAD
=======

>>>>>>> c83035d69fa602d4480c695cbbb87ddc7ae2de50
function logout() {
  alert('Logged out successfully!');
  
}

<<<<<<< HEAD
// The rest of the profile functions (loadProfile, updateProfile) remain unchanged 
// because they rely on the 'user' and 'profile' objects from localStorage.

// --- NEW PROFILE FUNCTIONS ---
=======
>>>>>>> c83035d69fa602d4480c695cbbb87ddc7ae2de50

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

<<<<<<< HEAD
// Call loadProfile when the page finishes loading, but only on profile.html
=======

const mainContainer = document.querySelector('.login-main');

function showRegisterPanel(e) {
    if (e) e.preventDefault();
    if (mainContainer) {
        mainContainer.classList.add('register-active');
        document.title = 'Cafe Zone | Register'; 
    }
}


function showLoginPanel(e) {
    if (e) e.preventDefault();
    if (mainContainer) {
        mainContainer.classList.remove('register-active');
        document.title = 'Cafe Zone | Login'; 
    }
}



>>>>>>> c83035d69fa602d4480c695cbbb87ddc7ae2de50
document.addEventListener('DOMContentLoaded', () => {
   
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
<<<<<<< HEAD
=======
    
  
    if (window.location.pathname.includes('login.html') && window.location.hash === '#register') {
        showRegisterPanel();
    }
>>>>>>> c83035d69fa602d4480c695cbbb87ddc7ae2de50
});