// pdf-viewer-server/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Store the current page number
let currentPage = 1;

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the current page number to the newly connected client
  socket.emit('pageChanged', currentPage);

  // Handle page change from admin
  socket.on('changePage', (pageNumber) => {
    currentPage = pageNumber;
    io.emit('pageChanged', currentPage); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
