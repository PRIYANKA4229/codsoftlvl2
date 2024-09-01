const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jobportal', { useNewUrlParser: true, useUnifiedTopology: true });

const Job = mongoose.model('Job', {
    title: String,
    company: String,
    location: String,
});

app.use(express.static('public'));

// API route to get jobs
app.get('/api/jobs', async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
