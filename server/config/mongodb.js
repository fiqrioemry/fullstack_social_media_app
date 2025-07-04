const mongoose = require("mongoose");
require("dotenv").config();

let isConnected = false;

async function initMongoDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("✅ Connected to MongoDB on PORT : 27017");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

module.exports = { mongoose, initMongoDB };
