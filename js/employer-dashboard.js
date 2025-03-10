document.addEventListener('DOMContentLoaded', function () {
    // Handle job posting form submission (unchanged)
    const jobPostingForm = document.getElementById('jobPostingForm');
    if (jobPostingForm) {
        jobPostingForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form data
            const formData = new FormData(jobPostingForm);
            const jobData = {};

            for (const [key, value] of formData.entries()) {
                jobData[key] = value;
            }

            // Validate required fields
            if (!jobData.jobTitle || !jobData.jobDescription) {
                alert('Please fill in all required fields');
                return;
            }

            // Simulate sending data to the server
            console.log('Job posting data:', jobData);

            // Show success message and reset form
            alert('Job posted successfully!');
            jobPostingForm.reset();
        });
    }

    // Load sidebar dynamically
    fetch("../components/employers-sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar").innerHTML = data;
            // Add event listeners to sidebar links AFTER the sidebar is loaded
            setupSidebarNavigation();
            highlightActiveLink();
        })
        .catch(error => console.error("Error loading sidebar:", error));

    function setupSidebarNavigation() {
        const sidebarLinks = document.querySelectorAll(".nav-item");

        sidebarLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default link behavior

                const targetPage = this.getAttribute("href");

                // Update URL without refreshing (optional)
                history.pushState({}, '', targetPage);

                // Load only the content area
                loadContent(targetPage);

                // Update active link
                sidebarLinks.forEach(l => l.classList.remove("active"));
                this.classList.add("active");
            });
        });
    }

    function loadContent(page) {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                // Create a temporary element to parse the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                // Extract just the main content
                const newContent = tempDiv.querySelector('.main-content').innerHTML;

                // Update just the content area
                document.querySelector('.main-content').innerHTML = newContent;

                // Re-initialize any scripts specific to the new content
                if (page.includes('job-posting')) {
                    // Reinitialize job posting form handlers
                    const newJobForm = document.getElementById('jobPostingForm');
                    if (newJobForm) {
                        // Setup form event listeners...
                    }
                }
                // Add similar conditions for other page-specific scripts
            })
            .catch(error => console.error("Error loading content:", error));
    }

    function highlightActiveLink() {
        const currentPage = window.location.pathname.split("/").pop();
        const sidebarLinks = document.querySelectorAll(".nav-item");

        sidebarLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    }

    // Toggle mobile sidebar (unchanged)
    document.addEventListener("click", function (event) {
        const toggleSidebarBtn = document.querySelector(".toggle-sidebar");
        const sidebar = document.querySelector(".sidebar");

        if (toggleSidebarBtn && sidebar && event.target === toggleSidebarBtn) {
            sidebar.classList.toggle("active");
        }
    });
});
