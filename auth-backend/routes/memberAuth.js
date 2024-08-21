const express = require('express');
const router = express.Router();

// Predefined members
const members = [
    { id: 1, username: 'johndoe', name: 'John Doe', password: 'password123', available: true },
    { id: 2, username: 'janesmith', name: 'Jane Smith', password: 'password456', available: true },
];

// Member login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const member = members.find(
    (m) => m.username === username && m.password === password
  );

  if (member) {
    res.status(200).json({ message: 'Login successful!', member });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;
