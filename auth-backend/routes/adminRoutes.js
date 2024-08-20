// routes/adminAuth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const admins = []; // In-memory admin store (use a database in a real app)

// Admin Registration Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if admin already exists
    const adminExists = admins.find(admin => admin.username === username);
    if (adminExists) {
        return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new admin
    const newAdmin = { username, password: hashedPassword };
    admins.push(newAdmin);

    res.status(201).json({ message: 'Admin registered successfully' });
});

// Admin Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the admin
    const admin = admins.find(admin => admin.username === username);
    if (!admin) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT with admin role
    const token = jwt.sign({ username: admin.username, role: 'admin' }, 'your_jwt_secret', {
        expiresIn: '1h'
    });

    res.json({ token });
});

module.exports = router;
