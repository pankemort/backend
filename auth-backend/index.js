// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const authRoutes = require('./routes/auth');
// const protectedRoutes = require('./routes/protected');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Use the authentication routes
// app.use('/api/auth', authRoutes);

// // Use the protected routes
// app.use('/api', protectedRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userAuthRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/adminAuth');
const adminRoutes = require('./routes/admin');
const protectedRoutes = require('./routes/protected');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// User authentication routes
app.use('/api/auth', userAuthRoutes);

// Admin authentication routes
app.use('/api/admin/auth', adminAuthRoutes);

// Admin protected routes
app.use('/api/admin', adminRoutes);

// User protected routes
app.use('/api', protectedRoutes);

let tickets = [];

// User submits a ticket
app.post('/api/tickets', (req, res) => {
  const newTicket = {
    id: Date.now().toString(),
    username: req.body.username,
    email: req.body.email,
    departmentName: req.body.departmentName,
    companyName: req.body.companyName,
    message: req.body.message,
    createdAt: new Date().toLocaleString(),
    status: 'pending',
  };
  tickets.push(newTicket);
  res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
});

// Admin fetches all tickets
app.get('/api/admin/tickets', (req, res) => {
  res.json(tickets);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// index.js or a separate file for ticket handling
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // In-memory storage for tickets
// let tickets = [];

// // User submits a ticket
// app.post('/api/tickets', (req, res) => {
//   const newTicket = {
//     id: Date.now().toString(), // Unique ID based on timestamp
//     username: req.body.username,
//     email: req.body.email,
//     departmentName: req.body.departmentName,
//     companyName: req.body.companyName,
//     message: req.body.message,
//     createdAt: new Date(),
//     status: 'pending',
//   };
//   tickets.push(newTicket);
//   res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
// });

// // Admin fetches all tickets
// app.get('/api/admin/tickets', (req, res) => {
//   res.json(tickets);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
