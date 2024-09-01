const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/jobportal', { useNewUrlParser: true, useUnifiedTopology: true });

// Schemas
const JobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    description: String,
});

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const Job = mongoose.model('Job', JobSchema);
const User = mongoose.model('User', UserSchema);

// Routes
app.get('/api/featured-jobs', async (req, res) => {
    const jobs = await Job.find().limit(5); // Example limit
    res.json(jobs);
});

app.get('/api/jobs', async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

app.get('/api/job/:id', async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (job) {
        res.json(job);
    } else {
        res.status(404).send('Job not found');
    }
});

app.post('/api/apply', multer().single('resume'), (req, res) => {
    // Handle application form submission
    res.json({ message: 'Application received' });
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.redirect('/login.html');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/dashboard.html');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
