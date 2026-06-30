
const form = document.querySelector('.login-container form');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const passwordInputs = form.querySelectorAll('input[type="password"]');

        // Registration form (has 2 password inputs: password & confirm password)
        if (passwordInputs.length === 2) {
            const fullNameInput = form.querySelector('input[type="text"]');
            const phoneInput = form.querySelector('input[type="tel"]');
            
            const fullName = fullNameInput ? fullNameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const password = passwordInputs[0].value;
            const confirmPassword = passwordInputs[1].value;

            if (!fullName) {
                alert('Please enter your full name.');
                return;
            }

            if (!email) {
                alert('Please enter your email address.');
                return;
            }

            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (!phone) {
                alert('Please enter your phone number.');
                return;
            }

            // Simple phone validation (digits, spaces, hyphens, parentheses, at least 10 characters)
            const phoneRegex = /^[0-9+\-\s()]{10,}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number (at least 10 digits).');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }

            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            // Check if email already exists
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

            if (userExists) {
                alert('This email is already registered. Please login instead.');
                return;
            }

            // Save new user details
            users.push({
                fullName,
                email: email.toLowerCase(),
                phone,
                password
            });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registration successful! Redirecting to login...');
            window.location.href = 'login.html';
            return;
        }

        // Login form
        const passwordInput = form.querySelector('input[type="password"]');
        const password = passwordInput ? passwordInput.value : '';

        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!password) {
            alert('Please enter your password.');
            return;
        }

        // Validate user credentials
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            alert('This email is not registered. Please create an account first.');
            return;
        }

        if (user.password !== password) {
            alert('Incorrect password. Please try again.');
            return;
        }

        // Set active session in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        alert('Login successful! Redirecting to home...');
        window.location.href = 'index.html';
    });
}
