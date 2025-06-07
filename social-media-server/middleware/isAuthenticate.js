const jwt = require('jsonwebtoken');

module.exports = async function isAuthenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res
        .status(401)
        .send({ message: 'You are not authenticate, please log in' });

    const token = authHeader.split(' ').pop();

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token has expired' });
        } else {
          return res.sendStatus(403);
        }
      }
      req.user = decode;

      next();
    });
  } catch (error) {
    console.log(error.message);
  }
};
