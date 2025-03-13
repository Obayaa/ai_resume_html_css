document.addEventListener("DOMContentLoaded", function () {
    // Load sidebar dynamically
    loadJobseekerSidebar();

    // Initialize profile form and other components
    // setupProfileForm();

    // Toggle mobile sidebar
    setupSidebarToggle();

    // Initialize current page content based on URL
    initializeCurrentPageContent();
    // initializeJobBrowsing();

    setTimeout(highlightActiveLink, 100); // Short delay to ensure sidebar is loaded
});

function loadJobseekerSidebar() {

    const user = JSON.parse(localStorage.getItem("user")) || {};
    const fullName = user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : "Jobseeker";
    const userRole = user.user_role || "Jobseeker";

    // Directly insert the sidebar HTML instead of fetching it
    const sidebarHTML = `<aside class="sidebar">
    <!-- Jobseeker Profile Section -->
    <div class="jobseeker-profile">
        <div class="profile-image">
            <img src="../assets/lady.jpg" alt="Jobseeker Profile">
        </div>
        <div class="profile-info">
            <h3>${fullName}</h3>
            <p>${userRole}</p>
        </div>
    </div>

    <!-- Navigation Links -->
    <nav class="dashboard-nav">
        <ul>
            <li>
                <a href="/pages/jobseekers-dashboard.html" class="nav-item">
                    <span class="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2" />
                        </svg>
                    </span>
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="/pages/jobseeker-my-jobs.html" class="nav-item">
                    <span class="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </span>
                    <span>My Jobs</span>
                </a>
            </li>
            <li>
                <a href="/pages/jobseeker-browse-jobs.html" class="nav-item">
                    <span class="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </span>
                    <span>Browse Jobs</span>
                </a>
            </li>
            <li>
                <a href="/pages/jobseeker-profile.html" class="nav-item">
                    <span class="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </span>
                    <span>My Profile</span>
                </a>
            </li>
        </ul>
    </nav>
</aside>`;

    const sidebarContainer = document.getElementById("sidebar");
    if (sidebarContainer) {
        sidebarContainer.innerHTML = sidebarHTML;
        console.log("Jobseeker sidebar manually inserted into #sidebar.");
        setupSidebarNavigation();
        highlightActiveLink();
    }
}

function setupSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll(".nav-item");

    sidebarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetPage = this.getAttribute("href");
            history.pushState({}, "", targetPage);

            loadContent(targetPage);
            updateActiveLink(this, sidebarLinks);
        });
    });
}

function loadContent(page) {
    // This fetches the HTML for the page
    fetch(page)
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;

            // Get the new page content (main-content) from the loaded HTML
            const newContent = tempDiv.querySelector(".main-content");

            if (newContent) {
                // Update the current page content with the new content
                document.querySelector(".main-content").innerHTML = newContent.innerHTML;
                document.title = tempDiv.querySelector("title").innerText;

                // Reinitialize page-specific scripts
                initializeCurrentPageContent();

                // If the page is the Browse Jobs page, initialize job listings
                if (window.location.pathname.includes("jobseeker-browse-jobs.html")) {
                    initializeJobBrowsing();  // Add this line to initialize job browsing
                }
            }
        })
        .catch(error => console.error("Error loading content:", error));
}

function initializeJobBrowsing() {
    console.log("Initializing job browsing page...");

    // Fetch jobs from the local jobs.json file
    // fetch('/models/jobs.json')  // Adjust this path if necessary
    //     .then(response => response.json())
    //     .then(data => {
    //         const jobListContainer = document.querySelector(".jobs-list"); // Ensure this element exists in your page
    //         if (jobListContainer && Array.isArray(data)) {
    //             // Clear any previous job listings
    //             jobListContainer.innerHTML = '';

    //             // Loop through each job and append it to the list
    //             data.forEach(job => {
    //                 const jobItem = document.createElement("div");
    //                 jobItem.classList.add("job-item");

    //                 jobItem.innerHTML = `
    //                     <h3>${job.title}</h3>
    //                     <p><strong>Company:</strong> ${job.company}</p>
    //                     <p><strong>Location:</strong> ${job.location}</p>
    //                     <p><strong>Type:</strong> ${job.type}</p>
    //                     <p><strong>Experience:</strong> ${job.experience}</p>
    //                     <p><strong>Salary:</strong> ${job.salary}</p>
    //                     <p>${job.shortDescription}</p>
    //                     <a href="/jobs/${job.id}" class="apply-btn">Apply Now</a>
    //                 `;
    //                 jobListContainer.appendChild(jobItem);
    //             });
    //         } else {
    //             jobListContainer.innerHTML = "<p>No jobs available at the moment.</p>";
    //         }
    //     })
    //     .catch(error => {
    //         console.error("Error fetching job listings:", error);
    //         const jobListContainer = document.querySelector(".job-list");
    //         if (jobListContainer) {
    //             jobListContainer.innerHTML = "<p>Error loading job listings. Please try again later.</p>";
    //         }
    //     });
}


function initializeCurrentPageContent() {
    // Setup profile form if we're on the profile page
    // setupProfileForm();

    // Initialize job browsing if we're on the browse jobs page
    if (window.location.pathname.includes("jobseeker-browse-jobs.html")) {
        console.log("Initializing job browsing page");
        // initializeJobBrowsing();
    }

    // Initialize saved/applied jobs if we're on my jobs page
    if (window.location.pathname.includes("jobseeker-my-jobs.html")) {
        console.log("Initializing my jobs page");
        // initializeMyJobs();
    }
}
function updateActiveLink(activeLink, allLinks) {
    allLinks.forEach(link => link.classList.remove("active"));
    activeLink.classList.add("active");
}

function highlightActiveLink() {
    // Get the current path (e.g., "/pages/jobseeker-profile.html")
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll(".nav-item");

    sidebarLinks.forEach(link => {
        link.classList.remove("active");
        // Get the href value (e.g., "/pages/jobseeker-profile.html")
        const linkPath = link.getAttribute("href");

        // Check if the current path ends with or matches the link path
        if (currentPath === linkPath || currentPath.endsWith(linkPath.split('/').pop())) {
            link.classList.add("active");
        }
    });
}

function setupSidebarToggle() {
    document.addEventListener("click", function (event) {
        const toggleSidebarBtn = document.querySelector(".toggle-sidebar");
        const sidebar = document.querySelector(".sidebar");

        if (toggleSidebarBtn && sidebar && event.target === toggleSidebarBtn) {
            sidebar.classList.toggle("active");
        }
    });
}





