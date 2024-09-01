document.addEventListener("DOMContentLoaded", () => {
    const jobId = window.location.pathname.split('/').pop();
    fetch(`/api/job/${jobId}`)
        .then(response => response.json())
        .then(job => {
            const jobInfo = document.getElementById('job-info');
            jobInfo.innerHTML = `
                <h2>${job.title}</h2>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Description:</strong> ${job.description}</p>
                <a href="application.html">Apply Now</a>
            `;
        });
});
