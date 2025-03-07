document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById("header");
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="header">
                <div class="container">
                    <h1 class="logo">AI Resume Screening</h1>
                    <nav>
                        <ul class="nav-links">
                            <li><a href="pages/jobs.html">Jobs</a></li>
                            <li><a href="pages/contact.html">Contact Us</a></li>
                            <li><button class="btn secondary-white" onclick="location.href='pages/jobseekers-signin.html'">Jobseekers</button></li>
                            <li><button class="btn danger" onclick="location.href='pages/employers-signin.html'">Employers</button></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
    }
});
