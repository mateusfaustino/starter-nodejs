const { ValidationError } = require('../utils/errors');

function validateCreateUser(req, res, next) {
  const errors = [];
  const { name, email, password, confirmPassword } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    errors.push({ message: 'Name must have at least 3 characters', path: 'name' });
  }

  if (!email || typeof email !== 'string' || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email)) {
    errors.push({ message: 'A valid e-mail is required', path: 'email' });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.push({ message: 'Password must have at least 8 characters', path: 'password' });
  }

  if (password !== confirmPassword) {
    errors.push({ message: 'Password confirmation does not match', path: 'confirmPassword' });
  }

  if (errors.length > 0) {
    return next(new ValidationError('Invalid request payload', errors));
  }

  req.body = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    confirmPassword,
  };

  return next();
}

function validateLogin(req, res, next) {
  const errors = [];
  const { email, password } = req.body || {};

  if (!email || typeof email !== 'string' || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email)) {
    errors.push({ message: 'A valid e-mail is required', path: 'email' });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.push({ message: 'Password must have at least 8 characters', path: 'password' });
  }

  if (errors.length > 0) {
    return next(new ValidationError('Invalid request payload', errors));
  }

  req.body = {
    email: email.trim().toLowerCase(),
    password,
  };

  return next();
}

module.exports = {
  validateCreateUser,
  validateLogin,
};
