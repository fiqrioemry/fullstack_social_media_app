require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

module.exports = cloudinary;
