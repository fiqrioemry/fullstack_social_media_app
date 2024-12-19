module.exports = function errorHandler(error, message, res) {
  return res.status(500).send({
    success: false,
    message: message,
    error: error.message,
  });
};
