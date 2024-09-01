document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/jobs')
        .then(response => response.json())
        .then(jobs => {
            const jobsList = document.getElementById('jobs-list');
            jobs.forEach(job => {
                const jobItem = document.createElement('div');
                jobItem.className = 'job-item';
                jobItem.innerHTML = `
                    <h3>${job.title}</h3>
                    <p>${job.company}</p>
                    <p>${job.location}</p>
                    <a href="/job/${job._id}">View Details</a>
                `;
                jobsList.appendChild(jobItem);
            });
        });
});
