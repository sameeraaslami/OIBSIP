document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Event Listeners
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    // Check if user is already logged in
    checkLoginStatus();

    // Register Form Submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        // Simple validation
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);
        
        if (userExists) {
            alert('User already exists with this email');
            return;
        }

        // Create new user
        const newUser = {
            name,
            email,
            password // Note: In a real app, never store plain text passwords
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Registration successful! Please login.');
        container.classList.remove('right-panel-active');
        registerForm.reset();
    });

    // Login Form Submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Check user credentials
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            // Create session
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect to secured page
            window.location.href = 'secured.html';
        } else {
            alert('Invalid credentials');
        }
    });
});

function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        window.location.href = 'secured.html';
    }
}