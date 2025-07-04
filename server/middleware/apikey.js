module.exports = async function verifyApiKey(req, res, next) {
  const bypassPaths = [];

  if (bypassPaths.some((path) => req.path.startsWith(path))) {
    return next();
  }

  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.SERVER_API_KEY) {
    res.status(401).json({ error: "Invalid API Key" });
    return;
  }

  next();
};
