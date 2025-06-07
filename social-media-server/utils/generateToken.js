require('dotenv').config;
const jwt = require('jsonwebtoken');

const generateAccessToken = (user, expiresIn = '30m') => {
  if (!user || !user.id) {
    throw new Error('User object must contain an id.');
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn },
  );

  return accessToken;
};

const generateRefreshToken = (user, expiresIn = '7d') => {
  if (!user || !user.id) {
    throw new Error('User object must contain an id.');
  }

  return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN, {
    expiresIn,
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
