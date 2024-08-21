// const express = require('express');
// const router = express.Router();

// // Assuming you have members and tickets defined in a centralized place
// const { members, tickets } = require('../data'); // Adjust this path according to your structure

// // Endpoint to manually assign a ticket to a member
// router.post('/assign-ticket', (req, res) => {
//   const { ticketId, memberId } = req.body;

//   const ticket = tickets.find((t) => t.id === ticketId);
//   const member = members.find((m) => m.id === memberId);

//   if (!ticket || !member) {
//     return res.status(404).json({ message: 'Ticket or Member not found' });
//   }

//   // Assign the ticket to the member
//   ticket.assignedMember = member.name;
//   member.available = false;

//   res.json({ message: 'Ticket assigned successfully', ticket });
// });

// // Endpoint to fetch all available members (optional)
// router.get('/members', (req, res) => {
//   res.json(members.filter((m) => m.available));
// });
// app.get('/api/member/tickets', (req, res) => {
//     const memberName = req.query.name;
//     const memberTickets = tickets.filter((ticket) => ticket.assignedMember === memberName);
//     res.json(memberTickets);
//   });
  

// module.exports = router;
const express = require('express');
const router = express.Router();

// Define members and tickets directly in this file
let members = [
    { id: 1, username: 'johndoe', name: 'John Doe', password: 'password123', available: true },
    { id: 2, username: 'janesmith', name: 'Jane Smith', password: 'password456', available: true },
];

let tickets = []; // Initialize an empty array for tickets

// Endpoint to manually assign a ticket to a member
router.post('/assign-ticket', (req, res) => {
  const { ticketId, memberId } = req.body;

  const ticket = tickets.find((t) => t.id === ticketId);
  const member = members.find((m) => m.id === memberId);

  if (!ticket || !member) {
    return res.status(404).json({ message: 'Ticket or Member not found' });
  }

  // Assign the ticket to the member
  ticket.assignedMember = member.name;
  member.available = false;

  res.json({ message: 'Ticket assigned successfully', ticket });
});

// Endpoint to fetch all available members
router.get('/members', (req, res) => {
  res.json(members.filter((m) => m.available));
});

// Endpoint to fetch tickets assigned to a specific member
router.get('/member/tickets', (req, res) => {
  const memberName = req.query.name;
  const memberTickets = tickets.filter((ticket) => ticket.assignedMember === memberName);
  res.json(memberTickets);
});

module.exports = router;

