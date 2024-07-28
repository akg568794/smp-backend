const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://smp-frontend-alpha.vercel.app'],
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: ['http://localhost:3000', 'https://smp-frontend-alpha.vercel.app']
}));

let currentStatus = {
  action: 'pause',
  currentTime: 0
};

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Send current status to newly connected client
  socket.emit('sync', currentStatus);

  socket.on('sync', (data) => {
    console.log('sync event received', data);
    currentStatus = data;
    socket.broadcast.emit('sync', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
