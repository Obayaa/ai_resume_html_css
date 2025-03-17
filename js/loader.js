document.addEventListener("DOMContentLoaded", function () {
    // Create and append loader to the body
    const loader = document.createElement("div");
    loader.id = "loader";
    loader.innerHTML = `
        <div class="spinner"></div>
        <span id="loader-text">0%</span>
    `;
    document.body.appendChild(loader);
    loader.style.display = "none"; // Initially hide loader

    function showLoader(targetUrl) {
        const loaderText = document.getElementById("loader-text");

        loader.style.display = "flex"; // Show loader
        let progress = 0;

        const interval = setInterval(() => {
            progress += 10;
            loaderText.textContent = progress + "%"; // Update percentage text

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.display = "none"; // Hide loader
                    window.location.href = targetUrl; // Navigate after loading
                }, 500);
            }
        }, 200);
    }

    // Attach event listeners to buttons with navigation links
    document.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default navigation

            const targetUrl = this.getAttribute("onclick")?.match(/'([^']+)'/)?.[1];

            if (targetUrl) {
                showLoader(targetUrl);
            }
        });
    });

    // Also apply loader to regular `<a>` links
    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function (event) {
            const targetUrl = this.href;
            if (targetUrl && !targetUrl.includes("#")) {
                event.preventDefault(); // Prevent immediate navigation
                showLoader(targetUrl);
            }
        });
    });
});
