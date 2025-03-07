document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const errorMessage = document.getElementById("error-message");

    // Detect if the page is for Employers or Jobseekers
    const isEmployerPage = window.location.pathname.includes("employers");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const fname = document.getElementById("fname").value.trim();
        const lname = document.getElementById("lname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        errorMessage.textContent = "";

        if (!fname || !lname || !email || !password) {
            errorMessage.textContent = "All fields are required.";
            return;
        }

        if (password.length < 6) {
            errorMessage.textContent = "Password must be at least 6 characters long.";
            return;
        }

        alert("Sign-up successful! Redirecting to sign-in page.");
        window.location.href = isEmployerPage ? "employers-signin.html" : "jobseekers-signin.html";
    });
});
