const jwt = require('jsonwebtoken');

const generateToken = (payload) => jwt.sign(payload, process.env.NODE_ENV !== 'production' ? JWT_SECRET : 'dev_secret', { expiresIn: '7d' });

module.exports = {
  generateToken,
};
