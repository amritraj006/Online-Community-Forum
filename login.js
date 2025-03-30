let loginDiv = document.querySelector("#loginDiv");
let loginButton = document.querySelector("#loginButton");

loginButton.addEventListener("click", () => {
    loginDiv.classList.toggle("hidden");
});

document.addEventListener("click", (event) => {
    if (!loginDiv.contains(event.target) && !loginButton.contains(event.target)) {
        loginDiv.classList.add("hidden");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton'); // The login button (li element)
    const loginForm = document.getElementById('loginForm'); // The login form
    const errorElement = document.getElementById('error'); // Error message container

    // Mock User Database (Replace with real backend logic)
    const mockUsers = [
        { email: "student1@example.com", username: "StudentOne", password: "Password123" },
        { email: "student2@university.edu", username: "JohnDoe", password: "SecurePass!2025" }
    ];

    // Check if user is already logged in
    const savedUsername = sessionStorage.getItem('username');
    if (savedUsername) {
        updateLoginButtonText(savedUsername); // Update button text
    }

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!email || !username || !password) {
                errorElement.textContent = 'All fields are required';
                return;
            }

            // Mock login verification
            const user = mockUsers.find(u => u.email === email && u.username === username && u.password === password);
            
            if (!user) {
                errorElement.textContent = 'Invalid credentials';
                return;
            }

            // Store username in sessionStorage (temporary)
            sessionStorage.setItem('username', username);

            // Show success alert
            alert("Successfully Logged In!");

            // Wait for 3 seconds, then reload the page
            setTimeout(() => {
                location.reload();
            }, 1000); // 3 seconds delay
        });
    }

    function updateLoginButtonText(username) {
        if (loginButton) {
            loginButton.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${username}`;
        }
    }
});

