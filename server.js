const express = require('express');
const mongoose = require('mongoose');
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
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Routes
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
