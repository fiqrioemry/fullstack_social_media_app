const mongoose = require('mongoose');

let isConnected = false;

async function initMongoDB() {
  if (isConnected) return;

  try {
    await mongoose.connect('mongodb://mongodb:27017/social_app');
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

module.exports = { mongoose, initMongoDB };
