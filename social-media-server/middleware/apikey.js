module.exports = async function verifyApiKey(req, res, next) {
  const clientKey = req.header('X-API-Key');

  if (!clientKey || clientKey !== process.env.SERVER_API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }

  next();
};
