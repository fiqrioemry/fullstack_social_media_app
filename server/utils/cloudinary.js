const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

//configure with env data
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

async function uploadMediaToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "bootcamp_learning",
    });

    return result;
  } catch (error) {
    throw new Error("Error uploading to cloudinary");
  }
}

module.exports = { uploadMediaToCloudinary };
