
function registerUser(e) {
  e.preventDefault();
<<<<<<< HEAD
  // Mobile is the new primary key. OTP is hardcoded as '1234'.
  const mobile = document.getElementById('regMobile').value;
  const otp = '1234'; 

  // Store user data. Default name 'User' is used since the name field was removed from register.html
  localStorage.setItem('user', JSON.stringify({mobile, password: otp, name: 'User'})); 
  alert(`Registration successful! Your OTP is: ${otp}. Please login using your Mobile Number.`);
  window.location.href = 'login.html';
=======
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  localStorage.setItem('user', JSON.stringify({name, email, password}));
  alert('Registration successful! Please login.');
  
  
  showLoginPanel(); 
  

  document.getElementById('regName').value = '';
  document.getElementById('regEmail').value = '';
  document.getElementById('regPassword').value = '';
  
>>>>>>> b63022879075f528ee52932b9fffe5cd6038a28a
  return false;
}


function loginUser(e) {
  e.preventDefault();
<<<<<<< HEAD
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
=======
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const user = JSON.parse(localStorage.getItem('user'));
  if(user && user.email === email && user.password === password) {
    alert('Login successful!');
    window.location.href = 'cafeteria.html';
  } else {
    alert('Invalid credentials!');
>>>>>>> b63022879075f528ee52932b9fffe5cd6038a28a
  }
  return false;
}


function logout() {
  alert('Logged out successfully!');
<<<<<<< HEAD
  // localStorage.removeItem('user'); // Optional: uncomment this to clear session on logout
}

// --- PROFILE FUNCTIONS ---
=======
  
}

>>>>>>> b63022879075f528ee52932b9fffe5cd6038a28a

function loadProfile() {
    
    const user = JSON.parse(localStorage.getItem('user')) || {};
    
    const profile = JSON.parse(localStorage.getItem('profile')) || {};
    
    
    if (document.getElementById('profileForm')) {
<<<<<<< HEAD
        // Load Name from profile or default user object
        document.getElementById('profileName').value = profile.name || user.name || '';
        
        // Load Mobile from primary user object and set readOnly
        document.getElementById('profileMobile').value = user.mobile || ''; 
        document.getElementById('profileMobile').readOnly = true; 
        
        // Load other details
        document.getElementById('profileEmail').value = profile.email || ''; 
=======
        
        document.getElementById('profileName').value = profile.name || user.name || '';
        document.getElementById('profileMobile').value = profile.mobile || '';
        
        
        document.getElementById('profileEmail').value = user.email || ''; 
        
>>>>>>> b63022879075f528ee52932b9fffe5cd6038a28a
        document.getElementById('profileDOB').value = profile.dob || '';
        document.getElementById('profileGender').value = profile.gender || '';
    }
}


function updateProfile(e) {
    e.preventDefault();

    const primaryUser = JSON.parse(localStorage.getItem('user')) || {};

    const updatedProfileData = {
        name: document.getElementById('profileName').value,
<<<<<<< HEAD
        mobile: document.getElementById('profileMobile').value, // Mobile is read-only, we just save it
        email: document.getElementById('profileEmail').value, 
=======
        mobile: document.getElementById('profileMobile').value,
>>>>>>> b63022879075f528ee52932b9fffe5cd6038a28a
        dob: document.getElementById('profileDOB').value,
        gender: document.getElementById('profileGender').value
    };

    
<<<<<<< HEAD
    // Update name in primary user object
=======
    localStorage.setItem('profile', JSON.stringify(updatedProfileData));
>>>>>>> b63022879075f528ee52932b9fffe5cd6038a28a
    primaryUser.name = updatedProfileData.name;
    localStorage.setItem('user', JSON.stringify(primaryUser));

    alert('Profile Updated Successfully!');
    return false;
}


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



document.addEventListener('DOMContentLoaded', () => {
   
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
    
  
    if (window.location.pathname.includes('login.html') && window.location.hash === '#register') {
        showRegisterPanel();
    }
});