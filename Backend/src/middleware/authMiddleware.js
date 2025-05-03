// server/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../../config');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token not provided' });
  
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded; // decoded payload includes user id
    next();
  });
};

module.exports = authMiddleware;
