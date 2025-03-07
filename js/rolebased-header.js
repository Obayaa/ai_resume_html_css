document.addEventListener("DOMContentLoaded", function () {
    function loadHeader(role) {
        const headerContainer = document.getElementById("role-header");
        if (headerContainer) {
            const oppositeRole = role === "jobseeker" ? "employer" : "jobseeker";
            const oppositePage = role === "jobseeker" ? "employers-signin.html" : "jobseekers-signin.html";

            headerContainer.innerHTML = `
                <header class="header">
                    <div class="container">
                        <h1 class="logo">AI Resume Screening</h1>
                        <nav>
                            <ul class="nav-links">
                                <li><a href="pages/jobs.html">Jobs</a></li>
                                <li><a href="pages/contact.html">Contact Us</a></li>
                                <li><button class="btn danger" onclick="location.href='${oppositePage}'">${oppositeRole.charAt(0).toUpperCase() + oppositeRole.slice(1)}</button></li>
                            </ul>
                        </nav>
                    </div>
                </header>
            `;
        }
    }

    // Detect role from the page
    const pageRole = document.body.getAttribute("data-role"); // Set this in the HTML
    loadHeader(pageRole);
});
