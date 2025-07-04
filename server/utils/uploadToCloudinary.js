const cloudinary = require('../config/cloudinary');

async function uploadToCloudinary(buffer) {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: process.env.CLOUD_FOLDER,
            transformation: [
              {
                width: 500,
                height: 500,
                crop: 'limit',
                format: 'webp',
              },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    return result;
  } catch (error) {
    throw new Error('Error uploading to Cloudinary: ' + error.message);
  }
}

module.exports = uploadToCloudinary;
