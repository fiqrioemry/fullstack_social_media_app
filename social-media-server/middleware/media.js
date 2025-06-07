const multer = require('multer');

const storage = multer.memoryStorage();

function fileFilter(params) {
  return (req, file, cb) => {
    const allowedExtensions = {
      mixed: /jpeg|jpg|png|webp|mp4|mkv|avi|mov/,
      image: /jpeg|jpg|png|webp/,
      video: /mp4|mkv|avi|mov/,
    };

    const extRegex = allowedExtensions[params];
    if (!extRegex) {
      return cb(new Error('Invalid file type parameter'), false);
    }

    const extName = extRegex.test(file.originalname.toLowerCase());

    const mimeType = extRegex.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${params} files are allowed!`), false);
    }
  };
}

function upload(params = 'image', size) {
  return multer({
    storage: storage,
    limits: { fileSize: size || 5000000 },
    fileFilter: fileFilter(params),
  });
}

module.exports = {
  upload,
};
