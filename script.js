function registerUser(e) {
  e.preventDefault();
  // Removed name field as requested.
  const email = document.getElementById('regEmail').value;
  // Simulating an OTP-based registration. We'll store a hardcoded '1234' as the password/OTP for demo.
  const otp = '1234'; 

  // Store in localStorage for demo (no real backend). Only email and 'password' (OTP) needed.
  localStorage.setItem('user', JSON.stringify({email, password: otp, name: 'User'})); // Keeping a default 'name' for profile page consistency
  alert(`Registration successful! Your OTP is ${otp}. Please login.`);
  window.location.href = 'login.html';
  return false;
}

// Global variable to hold the sent OTP (for a two-step login)
let sentOtp = ''; 

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

function logout() {
  alert('Logged out successfully!');
  // Optionally clear user session
}

// The rest of the profile functions (loadProfile, updateProfile) remain unchanged 
// because they rely on the 'user' and 'profile' objects from localStorage.

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

// Call loadProfile when the page finishes loading, but only on profile.html
document.addEventListener('DOMContentLoaded', () => {
    // Check the URL to only run loadProfile on the profile page
    if (window.location.pathname.includes('profile.html')) {
        loadProfile();
    }
});