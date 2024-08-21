// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const userAuthRoutes = require('./routes/auth');
// const adminAuthRoutes = require('./routes/adminAuth');
// const adminRoutes = require('./routes/admin');
// const protectedRoutes = require('./routes/protected');
// const adminTicketsRoutes = require('./routes/adminTickets');
// const memberAuthRoutes = require('./routes/memberAuth'); // Import member auth routes

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // User authentication routes
// app.use('/api/auth', userAuthRoutes);

// // Admin authentication routes
// app.use('/api/admin/auth', adminAuthRoutes);

// // Admin protected routes
// app.use('/api/admin', adminRoutes);

// // User protected routes
// app.use('/api', protectedRoutes);

// // Member authentication routes
// app.use('/api/member/auth', memberAuthRoutes); 
// // Use member auth routes

// app.use('/api/admin/tickets', adminTicketsRoutes);

// // In-memory storage for tickets and members
// let tickets = [];
// let members = [
//   { id: 1, username: 'johndoe', name: 'John Doe', available: true },
//   { id: 2, username: 'janesmith', name: 'Jane Smith', available: true },
// ]; // Example members

// // User submits a ticket
// app.post('/api/tickets', (req, res) => {
//   const availableMember = members.find((member) => member.available);

//   if (!availableMember) {
//     return res.status(500).json({ message: 'No members are available to take the ticket.' });
//   }

//   // Assign ticket to an available member
//   const newTicket = {
//     id: Date.now().toString(),
//     username: req.body.username,
//     email: req.body.email,
//     departmentName: req.body.departmentName,
//     companyName: req.body.companyName,
//     message: req.body.message,
//     createdAt: new Date().toLocaleString(),
//     status: 'pending',
//     assignedMember: availableMember.username, // Assign to member's username
//   };

//   // Mark the member as unavailable
//   availableMember.available = false;

//   tickets.push(newTicket);
//   res.status(201).json({ message: 'Ticket created and assigned successfully', ticket: newTicket });
// });

// // Admin fetches all tickets
// app.get('/api/admin/tickets', (req, res) => {
//   res.json(tickets);
// });

// // Member login
// app.post('/api/member/login', (req, res) => {
//   const { username, password } = req.body;
//   const member = members.find((m) => m.username === username && m.password === password);
  
//   if (member) {
//     return res.json({ message: 'Login successful', member });
//   } else {
//     return res.status(400).json({ message: 'Member not found' });
//   }
// });

// // Fetch tickets assigned to a specific member
// app.get('/api/member/tickets', (req, res) => {
//   const memberUsername = req.query.username;
//   const memberTickets = tickets.filter((ticket) => ticket.assignedMember === memberUsername);
//   res.json(memberTickets);
// });

// // Update ticket status by member
// app.post('/api/member/tickets/update', (req, res) => {
//   const { ticketId, status } = req.body;
//   const ticket = tickets.find((t) => t.id === ticketId);

//   if (!ticket) {
//     return res.status(404).json({ message: 'Ticket not found' });
//   }

//   ticket.status = status;

//   if (status === 'closed') {
//     // Mark the member as available again
//     const member = members.find((m) => m.username === ticket.assignedMember);
//     if (member) {
//       member.available = true;
//     }
//   }

//   res.json({ message: 'Ticket status updated', ticket });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const userAuthRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/adminAuth');
const adminRoutes = require('./routes/admin');
const protectedRoutes = require('./routes/protected');
const adminTicketsRoutes = require('./routes/adminTickets');
const memberAuthRoutes = require('./routes/memberAuth'); // Import member auth routes

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

// Member authentication routes
app.use('/api/member/auth', memberAuthRoutes); 
// Use member auth routes

app.use('/api/admin/tickets', adminTicketsRoutes);

// In-memory storage for tickets and members
let tickets = [];
let members = [
  { id: 1, username: 'johndoe', name: 'John Doe', available: true },
  { id: 2, username: 'janesmith', name: 'Jane Smith', available: true },
];
let closedTickets = []; // Store closed tickets separately

// User submits a ticket
app.post('/api/tickets', (req, res) => {
  const availableMember = members.find((member) => member.available);

  if (!availableMember) {
    return res.status(500).json({ message: 'No members are available to take the ticket.' });
  }

  // Assign ticket to an available member
  const newTicket = {
    id: Date.now().toString(),
    username: req.body.username,
    email: req.body.email,
    departmentName: req.body.departmentName,
    companyName: req.body.companyName,
    message: req.body.message,
    createdAt: new Date().toLocaleString(),
    status: 'pending',
    assignedMember: availableMember.username, // Assign to member's username
    resolveTime: null,
  };

  // Mark the member as unavailable
  availableMember.available = false;

  tickets.push(newTicket);
  res.status(201).json({ message: 'Ticket created and assigned successfully', ticket: newTicket });
});

// Admin fetches all tickets
app.get('/api/admin/tickets', (req, res) => {
  res.json(tickets);
});

// Admin fetches closed tickets
app.get('/api/admin/closed-tickets', (req, res) => {
  res.json(closedTickets);
});

// Member login
app.post('/api/member/login', (req, res) => {
  const { username, password } = req.body;
  const member = members.find((m) => m.username === username && m.password === password);
  
  if (member) {
    return res.json({ message: 'Login successful', member });
  } else {
    return res.status(400).json({ message: 'Member not found' });
  }
});

// Fetch tickets assigned to a specific member
app.get('/api/member/tickets', (req, res) => {
  const memberUsername = req.query.username;
  const memberTickets = tickets.filter((ticket) => ticket.assignedMember === memberUsername);
  res.json(memberTickets);
});

// Update ticket status by member
app.post('/api/member/tickets/update', (req, res) => {
  const { ticketId, status, resolveTime } = req.body;
  const ticket = tickets.find((t) => t.id === ticketId);

  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  ticket.status = status;
  if (resolveTime) {
    ticket.resolveTime = resolveTime;
  }

  if (status === 'closed') {
    // Mark the member as available again
    const member = members.find((m) => m.username === ticket.assignedMember);
    if (member) {
      member.available = true;
    }
    // Move the ticket to closed tickets
    tickets = tickets.filter((t) => t.id !== ticketId);
    closedTickets.push(ticket);
  }

  if (status === 'raised') {
    // Notify the user that the issue will take more time
    console.log(`Issue raised for ticket ID: ${ticketId}. Notify user.`);
  }

  res.json({ message: 'Ticket status updated', ticket });
});
// Fetch tickets assigned to a specific user
app.get('/api/user/tickets', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, 'your_jwt_secret');
  const userTickets = tickets.filter(ticket => ticket.username === decoded.username);
  res.json(userTickets);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
