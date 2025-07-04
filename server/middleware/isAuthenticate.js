const jwt = require('jsonwebtoken');

module.exports = async function isAuthenticate(req, res, next) {
  const token = req.cookies.accessToken;

  try {
    if (!token)
      return res.status(401).send({ message: 'Unauthorized. Please log in.' });

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' });
        } else {
          return res.status(403).json({ message: 'Forbidden' });
        }
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
