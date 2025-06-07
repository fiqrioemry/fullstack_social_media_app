require('dotenv').config();
require('./config/passport');
const cors = require('cors');
const express = require('express');
const services = require('./routes');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const limiter = require('./middleware/limiter');
const verifyApiKey = require('./middleware/apikey');
const { app, server } = require('./config/socket');
const { initMongoDB } = require('./config/mongodb');

const CLIENT_HOST = process.env.CLIENT_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

app.use(limiter);
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(
  cors({
    origin: CLIENT_HOST,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
  }),
);

app.use('/api/auth', services.authRoute);
app.use(verifyApiKey);
app.use('/api/user', services.userRoute);
app.use('/api/post', services.postRoute);
app.use('/api/chat', services.chatRoute);

server.listen(SERVER_PORT, async () => {
  await initMongoDB();
  console.log(`✅ Connected to Server on port ${SERVER_PORT}`);
});
