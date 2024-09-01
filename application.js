document.getElementById('application-form').addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    fetch('/api/apply', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert('Application submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
