document.addEventListener("DOMContentLoaded", () => {
    // Fetch user dashboard data (pseudo-code)
    fetch('/api/user/dashboard')
        .then(response => response.json())
        .then(data => {
            // Update dashboard content
            document.getElementById('dashboard').innerHTML = `
                <h2>Welcome, ${data.username}</h2>
                <p>Your posted jobs and applications will be listed here.</p>
            `;
        });
});
