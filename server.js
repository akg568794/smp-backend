const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://smp-frontend-alpha.vercel.app', // Replace with your frontend domain
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sync', (data) => {
    console.log('sync event received', data);
    io.emit('sync', data); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('Listening on port 3001');
});
