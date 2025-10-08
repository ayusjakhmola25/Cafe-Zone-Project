
function registerUser(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  localStorage.setItem('user', JSON.stringify({name, email, password}));
  alert('Registration successful! Please login.');
  
  
  showLoginPanel(); 
  

  document.getElementById('regName').value = '';
  document.getElementById('regEmail').value = '';
  document.getElementById('regPassword').value = '';
  
  return false;
}


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