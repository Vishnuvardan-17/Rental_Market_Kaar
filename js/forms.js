
const form = document.querySelector('.login-container form');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const passwordInputs = form.querySelectorAll('input[type="password"]');

        if (passwordInputs.length === 2) {
            const password = passwordInputs[0].value;
            const confirmPassword = passwordInputs[1].value;

            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }

            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            alert('Registration successful! Redirecting to login...');
            window.location.href = 'login.html';
            return;
        }

        alert('Login successful! Redirecting to home...');
        window.location.href = 'index.html';
    });
}
