// Job data management service
const JobDataService = {
    loadJobs: function() {
        // Try to get jobs from localStorage
        let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
        console.log("Initial jobs from localStorage:", jobs);

        // If no jobs in localStorage, use mock data
        if (jobs.length === 0) {
            jobs = this.getMockJobs();
            // Save mock data to localStorage for future use
            localStorage.setItem("jobs", JSON.stringify(jobs));
            console.log("Mock data created:", jobs);
        }
        
        return jobs;
    },

    getMockJobs: function() {
        return [
            {
                id: 1,
                jobTitle: "Senior Software Engineer",
                category: "technology",
                city: "San Francisco",
                region: "west",
                applications: 24,
                datePosted: "2025-03-05",
                status: "active"
            },
            {
                id: 2,
                jobTitle: "Marketing Manager",
                category: "marketing",
                city: "New York",
                region: "northeast",
                applications: 15,
                datePosted: "2025-03-08",
                status: "active"
            },
            {
                id: 3,
                jobTitle: "Data Analyst",
                category: "technology",
                city: "Remote",
                region: "remote",
                applications: 8,
                datePosted: "2025-03-01",
                status: "active"
            },
            {
                id: 4,
                jobTitle: "Financial Advisor",
                category: "finance",
                city: "Chicago",
                region: "midwest",
                applications: 6,
                datePosted: "2025-02-20",
                status: "paused"
            },
            {
                id: 5,
                jobTitle: "HR Specialist",
                category: "other",
                city: "Denver",
                region: "west",
                applications: 12,
                datePosted: "2025-03-10",
                status: "active"
            }
        ];
    },

    getAllJobs: function() {
        return JSON.parse(localStorage.getItem("jobs")) || [];
    },

    updateJobStatus: function(jobId, newStatus) {
        let jobs = this.getAllJobs();
        const jobIndex = jobs.findIndex(job => job.id === jobId);
        
        if (jobIndex !== -1) {
            jobs[jobIndex].status = newStatus;
            localStorage.setItem("jobs", JSON.stringify(jobs));
            
            // Re-render the jobs table
            window.JobListings.renderJobs(jobs);
        }
    },

    deleteJob: function(jobId) {
        let jobs = this.getAllJobs();
        jobs = jobs.filter(job => job.id !== jobId);
        localStorage.setItem("jobs", JSON.stringify(jobs));
        
        // Re-render the jobs table
        window.JobListings.renderJobs(jobs);
    }
};

// Make the service globally accessible
window.JobDataService = JobDataService;