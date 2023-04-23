const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: '../config/config.env'});

module.exports = (req, res, next) => {
    const token = req.headers['authorization']
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
     res.status(401).json({ error: 'Server error' });
  }
};