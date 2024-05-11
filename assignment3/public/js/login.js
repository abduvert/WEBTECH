// Navbar JS
var loginPopup = document.getElementById('loginPopup');
var loginButton = document.querySelector('.login'); // Changed to class selector

loginButton.onclick = function() {
    loginPopup.style.display = 'block';
}

window.onclick = function(event) {
    if (event.target == loginPopup) {
        loginPopup.style.display = 'none';
    }
}


var closeButton = document.querySelector('.cross');
var loginPopup = document.getElementById('loginPopup');
closeButton.addEventListener('click', function() {
    loginPopup.style.display = 'none'; // Hide the popup
});
