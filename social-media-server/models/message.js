const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: { type: String, required: true },
  senderId: { type: Number, required: true },
  receiverId: { type: Number, required: true },
  message: { type: String },
  image: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
