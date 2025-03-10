// Main functionality for job listings page
document.addEventListener('DOMContentLoaded', function () {
    // Load sidebar
    console.log("DOM fully loaded");
    loadSidebar();

    // Create New Job button action
    document.getElementById("createNewJob").addEventListener("click", function () {
        window.location.href = "./employer-new-job.html"; // Use relative path
    });

    initializeJobListings();


    // Setup filter event listeners
    document.getElementById("searchJobs").addEventListener("input", JobFilters.filterJobs);
    document.getElementById("categoryFilter").addEventListener("change", JobFilters.filterJobs);
    document.getElementById("statusFilter").addEventListener("change", JobFilters.filterJobs);
    document.getElementById("dateFilter").addEventListener("change", JobFilters.filterJobs);
});

function initializeJobListings() {
    console.log("Initializing job listings");
    try {
        // Make sure JobDataService is available
        if (typeof JobDataService === 'undefined') {
            console.error("JobDataService is not defined. Loading jobs failed.");
            return;
        }

        const jobs = JobDataService.loadJobs();
        console.log("Jobs loaded:", jobs);

        // Make sure JobListings functions are available
        if (typeof window.JobListings === 'undefined' ||
            typeof window.JobListings.renderJobs !== 'function') {
            console.error("JobListings.renderJobs is not defined. Rendering jobs failed.");
            return;
        }

        window.JobListings.renderJobs(jobs);
        console.log("Jobs rendered successfully");
    } catch (error) {
        console.error("Error initializing job listings:", error);
    }
}

function loadSidebar() {
    fetch("../components/sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar").innerHTML = data;
            // Highlight active sidebar link
            const sidebarLinks = document.querySelectorAll(".nav-item");
            sidebarLinks.forEach(link => {
                if (link.getAttribute("href").includes("job-listings.html")) {
                    link.classList.add("active");
                }
            });
        })
        .catch(error => console.error("Error loading sidebar:", error));
}

// Functions for rendering jobs and setting up action buttons
function renderJobs(jobs) {
    console.log("Rendering jobs:", jobs);
    const tableBody = document.getElementById("jobsTableBody");

    // Make sure the table body exists
    if (!tableBody) {
        console.error("jobsTableBody element not found");
        return;
    }

    tableBody.innerHTML = "";

    if (jobs.length === 0) {
        const noJobsRow = document.createElement("tr");
        noJobsRow.innerHTML = `
            <td colspan="7" class="no-jobs-message">
                No job listings found. <a href="./employer-new-job.html">Create your first job listing</a>.
            </td>
        `;
        tableBody.appendChild(noJobsRow);
        return;
    }

    jobs.forEach(job => {
        const formattedDate = new Date(job.datePosted).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const jobRow = document.createElement("tr");
        jobRow.innerHTML = `
            <td>
                <div class="job-title-container">
                    <span class="job-title">${job.jobTitle}</span>
                </div>
            </td>
            <td>${capitalizeFirstLetter(job.category)}</td>
            <td>${job.city}, ${capitalizeFirstLetter(job.region)}</td>
            <td>
                <span class="application-count">${job.applications}</span>
            </td>
            <td>${formattedDate}</td>
            <td>
                <span class="status-badge ${job.status}">${capitalizeFirstLetter(job.status)}</span>
            </td>
            <td>
                <div class="action-menu">
                    <button class="action-btn view-btn" data-id="${job.id}" title="View Details">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="action-btn edit-btn" data-id="${job.id}" title="Edit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <button class="action-btn toggle-status-btn" data-id="${job.id}" data-status="${job.status}" title="${job.status === 'active' ? 'Pause' : 'Activate'}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            ${job.status === 'active' ?
                '<path d="M10 9V15M14 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' :
                '<path d="M10 9L15 12L10 15V9Z" fill="currentColor"/><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
            }
                        </svg>
                    </button>
                    <button class="action-btn delete-btn" data-id="${job.id}" title="Delete">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(jobRow);
    });

    // Add event listeners to action buttons
    setupActionButtons();
}

function setupActionButtons() {
    // View job details
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const jobId = this.getAttribute('data-id');
            alert(`View details for job #${jobId}`);
            // Redirect to job details page
            // window.location.href = `job-details.html?id=${jobId}`;
        });
    });

    // Edit job
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const jobId = this.getAttribute('data-id');
            alert(`Edit job #${jobId}`);
            // Redirect to edit job page
            // window.location.href = `edit-job.html?id=${jobId}`;
        });
    });

    // Toggle job status (active/paused)
    document.querySelectorAll('.toggle-status-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const jobId = parseInt(this.getAttribute('data-id'));
            const currentStatus = this.getAttribute('data-status');
            const newStatus = currentStatus === 'active' ? 'paused' : 'active';

            // Update job in data service
            JobDataService.updateJobStatus(jobId, newStatus);
        });
    });

    // Delete job
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const jobId = parseInt(this.getAttribute('data-id'));

            if (confirm("Are you sure you want to delete this job listing? This action cannot be undone.")) {
                // Delete job using data service
                JobDataService.deleteJob(jobId);
            }
        });
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Handle page visibility changes (when user comes back to the tab)
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log("Page is now visible, reinitializing job listings");
        initializeJobListings();
    }
});

// Handle page reload/refresh events more explicitly
window.addEventListener('pageshow', function(event) {
    // pageshow event fires when page is loaded or restored from bfcache
    if (event.persisted) {
        console.log("Page was restored from back-forward cache, reinitializing");
        initializeJobListings();
    }
});

// Make functions available to other modules
window.JobListings = {
    renderJobs: renderJobs
};