const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// filter configuration
function fileFilter(params) {
  return (req, file, cb) => {
    const allowedExtensions = {
      mixed: /jpeg|jpg|png|webp|mp4|mkv|avi|mov/,
      image: /jpeg|jpg|png|webp/,
      video: /mp4|mkv|avi|mov/,
    };

    const extRegex = allowedExtensions[params];
    if (!extRegex) {
      return cb(new Error("Invalid file type parameter"), false);
    }

    const extName = extRegex.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimeType = extRegex.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${params} files are allowed!`), false);
    }
  };
}

// error handler configuration
function multerErrorHandle(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.status(400).send({ message: err.message });
  } else if (err) {
    res.status(400).send({ message: err.message });
  } else {
    next();
  }
}

// multer configuration
function upload(params, size) {
  return multer({
    storage: storage,
    limits: { fileSize: size || 1000000 },
    fileFilter: fileFilter(params),
  });
}

module.exports = {
  upload,
  multerErrorHandle,
};
