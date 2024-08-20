// routes/admin.js
const express = require('express');
const adminAuth = require('../middleware/adminAuth'); // Middleware for authenticating admin
const router = express.Router();

router.get('/dashboard', adminAuth, (req, res) => {
    res.json({
        username: req.admin.username,
        message: `Welcome to the admin dashboard, ${req.admin.username}`
    });
});

module.exports = router;
