const cloudinary = require('../config/cloudinary');

async function deleteFromCloudinary(imageUrl) {
  try {
    const publicId = imageUrl.split('/').slice(-1).join('/').split('.').shift();
    await cloudinary.uploader.destroy(
      `${process.env.CLOUD_FOLDER}/${publicId}`,
    );
  } catch (error) {
    throw new Error('Failed to delete asset from Cloudinary');
  }
}

module.exports = deleteFromCloudinary;
