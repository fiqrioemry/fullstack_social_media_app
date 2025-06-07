require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
app.set('trust proxy', 1);
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_HOST,
    credentials: true,
  },
});

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};

io.on('connection', (socket) => {
  //
  console.log('A user connected', socket.id);

  const userId = socket.handshake.auth.userId;

  if (userId) userSocketMap[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    //
    console.log('A user disconnected', socket.id);

    delete userSocketMap[userId];

    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };
