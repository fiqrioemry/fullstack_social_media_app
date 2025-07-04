require("dotenv").config();
require("./config/passport");
const cors = require("cors");
const express = require("express");
const services = require("./routes");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const limiter = require("./middleware/limiter");
const verifyApiKey = require("./middleware/apikey");
const { app, server } = require("./config/socket");
const { initMongoDB } = require("./config/mongodb");

const CLIENT_HOST = process.env.CLIENT_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

app.use(limiter);
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(verifyApiKey);

app.use(
  cors({
    origin: CLIENT_HOST,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use("/api/auth", services.authRoute);
app.use("/api/user", services.userRoute);
app.use("/api/post", services.postRoute);
app.use("/api/chat", services.chatRoute);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get("/", (req, res) => {
  console.log("Root endpoint accessed", {
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  res.status(200).json({
    status: "success",
    message: "Welcome to social media API",
    version: "1.1.0",
  });
});

server.listen(SERVER_PORT, async () => {
  await initMongoDB();
  console.log(`✅ Connected to server on port ${SERVER_PORT}`);
});
