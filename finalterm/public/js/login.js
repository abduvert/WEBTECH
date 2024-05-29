// Navbar JS
var loginPopup = document.getElementById('loginPopup');
var loginButton = document.querySelector('.login'); 
var signupButton = document.querySelector('.signup'); 

loginButton.onclick = function() {
    window.location.href = "/login";
}

signupButton.onclick = function() {
    window.location.href = "/register";
}





document.querySelector('.loginform').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch("/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("rfgre rfrf hfgieri")
            console.log(data.token);
            localStorage.token  = data.token
            alert("Login successful");
            window.location.href = '/stores';
        } else {
            alert("Invalid email or password");
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert("An error occurred during login");
    }
});

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function fetchProtectedData() {
    try {
        const response = await fetch('/api/protected', {
            method: 'GET',
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Protected data:', data);
        } else {
            console.log('Failed to fetch protected data');
        }
    } catch (error) {
        console.error('Error fetching protected data:', error);
    }
}

// Call fetchProtectedData to demonstrate the usage of token in headers
fetchProtectedData();
