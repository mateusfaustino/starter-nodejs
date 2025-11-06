const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { UnauthorizedError } = require('../utils/errors');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new UnauthorizedError('Authorization header missing'));
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return next(new UnauthorizedError('Token not provided'));
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    return next();
  } catch (error) {
    return next(new UnauthorizedError('Invalid or expired token'));
  }
}

module.exports = authMiddleware;
