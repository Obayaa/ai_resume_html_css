function loadAuthForm(type) {
    if (!document.getElementById("auth-container")) {
        console.error("Missing #auth-container in HTML!");
        return;
    }

    const pageTitle = type === "employer" ? "EMPLOYERS SIGN IN" : "JOBSEEKERS SIGN IN";
    const switchText = type === "employer" ? "Are you a Jobseeker?" : "Are you an Employer?";
    const switchPath = type === "employer" ? "jobseekers-signin.html" : "employers-signin.html";
    const signUpPath = type === "employer" ? "employers-signup.html" : "jobseekers-signup.html";
    const profilePath = type === "employer" ? "employers-profile.html" : "jobseekers-profile.html";

    return `
        

        <form id="signin-form">
            <div>
                <h2 class="title">${pageTitle}</h2>
                <p class="subtitle">Access Your Account</p>
                <p id="error-message" class="error-message"></p>
            </div>
            
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter Email" required>

            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter Password" required>

            <button type="submit" onclick="window.location.href='${profilePath}'" class="signin-btn">SIGN IN</button>
        </form>

        <div class="auth-box">
            <p>Don't have an account?</p>
            <button onclick="location.href='${signUpPath}'" class="secondary-btn">SIGN UP HERE</button>
            <p>${switchText}</p>
            <button onclick="location.href='${switchPath}'" class="secondary-btn">SIGN IN HERE</button>
        </div>
    `;
}

function loadSignUpForm(type) {
    if (!document.getElementById("auth-container")) {
        console.error("Missing #auth-container in HTML!");
        return;
    }

    const pageTitle = type === "employer" ? "EMPLOYERS SIGN UP" : "JOBSEEKERS SIGN UP";
    const fnameLabel = type === "employer" ? "Company Name" : "First Name";
    const lnameLabel = type === "employer" ? "Contact Name" : "Last Name";
    const switchText = type === "employer" ? "Are you a Jobseeker?" : "Are you an Employer?";
    const switchPath = type === "employer" ? "jobseekers-signup.html" : "employers-signup.html";
    const signInPath = type === "employer" ? "employers-signin.html" : "jobseekers-signin.html";

    return `
        
        <form id="signup-form">
            <div>
                <h2 class="title">${pageTitle}</h2>
                <p class="subtitle">Create an Account</p>
                <p id="error-message" class="error-message"></p>
            </div>

            <label for="fname">${fnameLabel}</label>
            <input type="text" id="fname" placeholder="Enter ${fnameLabel}" required>

            <label for="lname">${lnameLabel}</label>
            <input type="text" id="lname" placeholder="Enter ${lnameLabel}" required>

            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter Email" required>

            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter Password" required>

            <button type="submit" onclick="location.href='${signInPath}'" class="signup-btn">REGISTER</button>
        </form>

        <div class="auth-box">
            <p>Already Registered?</p>
            <button onclick="location.href='${signInPath}'" class="secondary-btn">SIGN IN HERE</button>
            <p>${switchText}</p>
            <button onclick="location.href='${switchPath}'" class="secondary-btn">SIGN UP HERE</button>
        </div>
    `;
}
