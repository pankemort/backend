    const express = require('express');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');

    const router = express.Router();

    const users = []; // In-memory user store (use a database in a real app)

    // Register Route
    router.post('/register', async (req, res) => {
        const { username, password } = req.body;

        // Check if user already exists
        const userExists = users.find(user => user.username === username);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user
        const newUser = { username, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    });

    // Login Route
    router.post('/login', async (req, res) => {
        const { username, password } = req.body;

        // Find the user
        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT
        const token = jwt.sign({ username: user.username }, 'your_jwt_secret', {
            expiresIn: '1h'
        });

        res.json({ token });
    });

    module.exports = router;
    // routes/auth.js

