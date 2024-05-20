// Navbar JS
var loginPopup = document.getElementById('loginPopup');
var loginButton = document.querySelector('.login'); 
var signupButton = document.querySelector('.signup'); 

loginButton.onclick = function() {
    window.location.href = "/login"
}

signupButton.onclick = function() {
    window.location.href = "/register"
}

window.onclick = function(event) {
    if (event.target == loginPopup) {
        loginPopup.style.display = 'none';
    }
}


var closeButton = document.querySelector('.cross');
var loginPopup = document.getElementById('loginPopup');
closeButton.addEventListener('click', function() {
    loginPopup.style.display = 'none'; 
    window.history.back();
});


document.querySelector('.form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Proceed with form submission (e.g., using fetch or AJAX)
});
