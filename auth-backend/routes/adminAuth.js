const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Pre-existing admin credentials
const admins = [
    {
        username: 'admin1',
        password: bcrypt.hashSync('password1', 10) // Hashed password
    },
    {
        username: 'admin2',
        password: bcrypt.hashSync('password2', 10) // Hashed password
    }
];

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
