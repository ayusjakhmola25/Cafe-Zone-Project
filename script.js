// Existing function: registerUser
function registerUser(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  // Store in localStorage for demo (no real backend)
  localStorage.setItem('user', JSON.stringify({name, email, password}));
  alert('Registration successful! Please login.');
  
  // *** MODIFIED: Switch to Login form (slide back) ***
  showLoginPanel(); 
  
  // Optionally clear the register form
  document.getElementById('regName').value = '';
  document.getElementById('regEmail').value = '';
  document.getElementById('regPassword').value = '';
  
  return false;
}

// Existing function: loginUser
function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const user = JSON.parse(localStorage.getItem('user'));
  if(user && user.email === email && user.password === password) {
    alert('Login successful!');
    window.location.href = 'cafeteria.html';
  } else {
    alert('Invalid credentials!');
  }
  return false;
}

// Existing function: logout
function logout() {
  alert('Logged out successfully!');
  // Optionally clear user session
}

// --- NEW PROFILE FUNCTIONS ---

// Function to load profile data when the profile page opens
function loadProfile() {
    // Get primary user data (contains email/password set at registration)
    const user = JSON.parse(localStorage.getItem('user')) || {};
    // Get extended profile data (stored/updated on profile.html)
    const profile = JSON.parse(localStorage.getItem('profile')) || {};
    
    // Check if the form elements exist (only on profile.html)
    if (document.getElementById('profileForm')) {
        // Set values from extended profile, fallback to primary user name
        document.getElementById('profileName').value = profile.name || user.name || '';
        document.getElementById('profileMobile').value = profile.mobile || '';
        
        // Set email from primary user object (read-only)
        document.getElementById('profileEmail').value = user.email || ''; 
        
        document.getElementById('profileDOB').value = profile.dob || '';
        document.getElementById('profileGender').value = profile.gender || '';
    }
}

// Function to handle profile update
function updateProfile(e) {
    e.preventDefault();

    const primaryUser = JSON.parse(localStorage.getItem('user')) || {};

    const updatedProfileData = {
        name: document.getElementById('profileName').value,
        mobile: document.getElementById('profileMobile').value,
        dob: document.getElementById('profileDOB').value,
        gender: document.getElementById('profileGender').value
    };

    // Save the extended profile data
    localStorage.setItem('profile', JSON.stringify(updatedProfileData));
    
    // Update the name in the primary user object too, for display consistency
    primaryUser.name = updatedProfileData.name;
    localStorage.setItem('user', JSON.stringify(primaryUser));

    alert('Profile Updated Successfully!');
    return false;
}

// --- NEW FORM SWITCHING LOGIC (For Sliding Animation) ---

// Get the main container for animation
const mainContainer = document.querySelector('.login-main');

// Function to show the Register form (Slides to the left)
function showRegisterPanel(e) {
    if (e) e.preventDefault();
    if (mainContainer) {
        mainContainer.classList.add('register-active');
        document.title = 'Cafe Zone | Register'; // Change page title dynamically
    }
}

// Function to show the Login form (Slides back to the right)
function showLoginPanel(e) {
    if (e) e.preventDefault();
    if (mainContainer) {
        mainContainer.classList.remove('register-active');
        document.title = 'Cafe Zone | Login'; // Change page title dynamically
    }
}


// Existing DOMContentLoaded logic
document.addEventListener('DOMContentLoaded', () => {
    // Check the URL to only run loadProfile on the profile page
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
    
    // NEW: Check if the login page is being loaded and handle URL hash
    // This allows linking to the register form directly or handling browser back/forward
    if (window.location.pathname.includes('login.html') && window.location.hash === '#register') {
        showRegisterPanel();
    }
});