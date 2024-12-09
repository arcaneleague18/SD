function validationRegistrationForm() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate username
    if (username.length < 5) {
        alert("Username must be at least 5 characters.");
        return false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Corrected regex
    if (!emailPattern.test(email)) {
        alert("Please provide a valid email address.");
        return false;
    }

    // Validate password
    if (password.length < 3) {
        alert("Password must be at least 3 characters.");
        return false;
    }

    // If all validations pass
    return true;
}
