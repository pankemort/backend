// middleware/adminAuth.js
const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'your_jwt_secret');
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

module.exports = adminAuth;
