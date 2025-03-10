// Job filtering functionality
const JobFilters = {
    filterJobs: function () {
        const searchTerm = document.getElementById("searchJobs").value.toLowerCase();
        const categoryFilter = document.getElementById("categoryFilter").value;
        const statusFilter = document.getElementById("statusFilter").value;
        const dateFilter = document.getElementById("dateFilter").value;

        // Get all jobs from data service
        let jobs = JobDataService.getAllJobs();
        console.log("Filtering jobs. Total jobs:", jobs.length);

        // Apply filters
        const filteredJobs = jobs.filter(job => {
            // Search term filter
            const matchesSearch = job.jobTitle.toLowerCase().includes(searchTerm) ||
                job.city.toLowerCase().includes(searchTerm);

            // Category filter
            const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;

            // Status filter
            const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

            // Date filter
            let matchesDate = true;
            if (dateFilter !== 'all') {
                const jobDate = new Date(job.datePosted);
                const today = new Date();

                if (dateFilter === 'today') {
                    matchesDate = jobDate.toDateString() === today.toDateString();
                } else if (dateFilter === 'week') {
                    const weekAgo = new Date();
                    weekAgo.setDate(today.getDate() - 7);
                    matchesDate = jobDate >= weekAgo;
                } else if (dateFilter === 'month') {
                    const monthAgo = new Date();
                    monthAgo.setMonth(today.getMonth() - 1);
                    matchesDate = jobDate >= monthAgo;
                }
            }

            return matchesSearch && matchesCategory && matchesStatus && matchesDate;
        });

        console.log("Filtered jobs:", filteredJobs.length);

        // Render filtered jobs
        window.JobListings.renderJobs(filteredJobs);
    }
};

// Make the filters globally accessible
window.JobFilters = JobFilters;