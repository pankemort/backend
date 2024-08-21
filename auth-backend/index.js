

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
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
// ];
// let closedTickets = []; // Store closed tickets separately

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
//     resolveTime: null,
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

// // Admin fetches closed tickets
// app.get('/api/admin/closed-tickets', (req, res) => {
//   res.json(closedTickets);
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
//   const { ticketId, status, resolveTime } = req.body;
//   const ticket = tickets.find((t) => t.id === ticketId);

//   if (!ticket) {
//     return res.status(404).json({ message: 'Ticket not found' });
//   }

//   ticket.status = status;
//   if (resolveTime) {
//     ticket.resolveTime = resolveTime;
//   }

//   if (status === 'closed') {
//     // Mark the member as available again
//     const member = members.find((m) => m.username === ticket.assignedMember);
//     if (member) {
//       member.available = true;
//     }
//     // Move the ticket to closed tickets
//     tickets = tickets.filter((t) => t.id !== ticketId);
//     closedTickets.push(ticket);
//   }

//   if (status === 'raised') {
//     // Notify the user that the issue will take more time
//     console.log(`Issue raised for ticket ID: ${ticketId}. Notify user.`);
//   }

//   res.json({ message: 'Ticket status updated', ticket });
// });
// // Fetch tickets assigned to a specific user
// app.get('/api/user/tickets', (req, res) => {
//   const token = req.headers.authorization.split(' ')[1];
//   const decoded = jwt.verify(token, 'your_jwt_secret');
//   const userTickets = tickets.filter(ticket => ticket.username === decoded.username);
//   res.json(userTickets);
// });
// app.post('/api/member/tickets/update', (req, res) => {
//   const { ticketId, status, resolveTime } = req.body;
//   const ticket = tickets.find((t) => t.id === ticketId);

//   if (!ticket) {
//     return res.status(404).json({ message: 'Ticket not found' });
//   }

//   ticket.status = status;
//   if (resolveTime) {
//     ticket.resolveTime = resolveTime;
//   }

//   if (status === 'closed') {
//     // Mark the member as available again
//     const member = members.find((m) => m.username === ticket.assignedMember);
//     if (member) {
//       member.available = true;
//     }
//     // Move the ticket to closed tickets
//     tickets = tickets.filter((t) => t.id !== ticketId);
//     closedTickets.push(ticket);
//   }

//   if (status === 'raised') {
//     console.log(`Issue raised for ticket ID: ${ticketId}. Notify user.`);
//     // Optionally, add a notification flag or message to the ticket
//     ticket.notification = 'Your issue has been raised and will require more time to resolve.';
//   }

//   res.json({ message: 'Ticket status updated', ticket });
// });
// // Fetch tickets assigned to a specific user
// app.get('/api/user/tickets', (req, res) => {
//   const token = req.headers.authorization.split(' ')[1];
//   const decoded = jwt.verify(token, 'your_jwt_secret'); // Use jwt to verify token

//   const userTickets = tickets.filter(ticket => ticket.username === decoded.username);
//   const userClosedTickets = closedTickets.filter(ticket => ticket.username === decoded.username);

//   res.json({ openTickets: userTickets, closedTickets: userClosedTickets });
// });


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const http = require('http');
// const { Server } = require('socket.io');

// const userAuthRoutes = require('./routes/auth');
// const adminAuthRoutes = require('./routes/adminAuth');
// const adminRoutes = require('./routes/admin');
// const protectedRoutes = require('./routes/protected');
// const adminTicketsRoutes = require('./routes/adminTickets');
// const memberAuthRoutes = require('./routes/memberAuth'); // Import member auth routes

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

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

// app.use('/api/admin/tickets', adminTicketsRoutes);

// // In-memory storage for tickets and members
// let tickets = [];
// let closedTickets = []; // Store closed tickets separately
// let members = [
//   { id: 1, username: 'johndoe', name: 'John Doe', password: 'password123', available: true },
//   { id: 2, username: 'janesmith', name: 'Jane Smith', password: 'password456', available: true },
// ];

// // User submits a ticket
// app.post('/api/tickets', (req, res) => {
//   const availableMember = members.find((member) => member.available);

//   if (!availableMember) {
//     return res.status(500).json({ message: 'No members are available to take the ticket.' });
//   }

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
//     resolveTime: null,
//   };

//   availableMember.available = false;

//   tickets.push(newTicket);
//   io.emit('ticketStatusUpdated', newTicket); // Emit an event for the new ticket

//   res.status(201).json({ message: 'Ticket created and assigned successfully', ticket: newTicket });
// });

// // Admin fetches all tickets
// app.get('/api/admin/tickets', (req, res) => {
//   res.json(tickets);
// });

// // Admin fetches closed tickets
// app.get('/api/admin/closed-tickets', (req, res) => {
//   res.json(closedTickets);
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
//   const { ticketId, status, resolveTime } = req.body;
//   const ticket = tickets.find((t) => t.id === ticketId);

//   if (!ticket) {
//     return res.status(404).json({ message: 'Ticket not found' });
//   }

//   ticket.status = status;
//   if (resolveTime) {
//     ticket.resolveTime = resolveTime;
//   }

//   if (status === 'closed') {
//     const member = members.find((m) => m.username === ticket.assignedMember);
//     if (member) {
//       member.available = true;
//     }
//     tickets = tickets.filter((t) => t.id !== ticketId);
//     closedTickets.push(ticket);
//   }

//   if (status === 'raised') {
//     console.log(`Issue raised for ticket ID: ${ticketId}. Notify user.`);
//     ticket.notification = 'Your issue has been raised and will require more time to resolve.';
//   }

//   io.emit('ticketStatusUpdated', ticket); // Emit an event for ticket status updates

//   res.json({ message: 'Ticket status updated', ticket });
// });

// // Fetch tickets assigned to a specific user
// app.get('/api/user/tickets', (req, res) => {
//   const token = req.headers.authorization.split(' ')[1];
//   const decoded = jwt.verify(token, 'your_jwt_secret'); // Use jwt to verify token

//   const userTickets = tickets.filter(ticket => ticket.username === decoded.username);
//   const userClosedTickets = closedTickets.filter(ticket => ticket.username === decoded.username);

//   res.json({ openTickets: userTickets, closedTickets: userClosedTickets });
// });

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');

const userAuthRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/adminAuth');
const adminRoutes = require('./routes/admin');
const protectedRoutes = require('./routes/protected');
const adminTicketsRoutes = require('./routes/adminTickets');
const memberAuthRoutes = require('./routes/memberAuth');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust based on your frontend's URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', userAuthRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', protectedRoutes);
app.use('/api/admin/tickets', adminTicketsRoutes);
app.use('/api/member/auth', memberAuthRoutes);

let tickets = [];
let members = [
  { id: 1, username: 'johndoe', name: 'John Doe', available: true },
  { id: 2, username: 'janesmith', name: 'Jane Smith', available: true },
];
let closedTickets = [];

app.post('/api/tickets', (req, res) => {
  const availableMember = members.find((member) => member.available);

  if (!availableMember) {
    return res.status(500).json({ message: 'No members are available to take the ticket.' });
  }

  const newTicket = {
    id: Date.now().toString(),
    username: req.body.username,
    email: req.body.email,
    departmentName: req.body.departmentName,
    companyName: req.body.companyName,
    message: req.body.message,
    createdAt: new Date().toLocaleString(),
    status: 'pending',
    assignedMember: availableMember.username,
    resolveTime: null,
  };

  availableMember.available = false;
  tickets.push(newTicket);

  res.status(201).json({ message: 'Ticket created and assigned successfully', ticket: newTicket });
});

app.get('/api/admin/tickets', (req, res) => {
  res.json(tickets);
});

app.get('/api/admin/closed-tickets', (req, res) => {
  res.json(closedTickets);
});

app.post('/api/member/login', (req, res) => {
  const { username, password } = req.body;
  const member = members.find((m) => m.username === username && m.password === password);

  if (member) {
    return res.json({ message: 'Login successful', member });
  } else {
    return res.status(400).json({ message: 'Member not found' });
  }
});

app.get('/api/member/tickets', (req, res) => {
  const memberUsername = req.query.username;
  const memberTickets = tickets.filter((ticket) => ticket.assignedMember === memberUsername);
  res.json(memberTickets);
});

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
    const member = members.find((m) => m.username === ticket.assignedMember);
    if (member) {
      member.available = true;
    }
    tickets = tickets.filter((t) => t.id !== ticketId);
    closedTickets.push(ticket);
  }

  if (status === 'raised') {
    ticket.notification = 'Your issue has been raised and will require more time to resolve.';
  }

  io.emit('ticketStatusUpdated', ticket); // Emit the event to all connected clients

  res.json({ message: 'Ticket status updated', ticket });
});

app.get('/api/user/tickets', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, 'your_jwt_secret');
  const userTickets = tickets.filter(ticket => ticket.username === decoded.username);
  const userClosedTickets = closedTickets.filter(ticket => ticket.username === decoded.username);

  res.json({ openTickets: userTickets, closedTickets: userClosedTickets });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
