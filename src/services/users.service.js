const jwt = require('jsonwebtoken');
const usersRepository = require('../repositories/users.repository');
const env = require('../config/env');
const logger = require('../utils/logger');
const { ConflictError, UnauthorizedError } = require('../utils/errors');
const { hashPassword, verifyPassword } = require('../utils/password');

function formatUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user._id ? user._id.toString() : user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function listUsers() {
  const users = await usersRepository.findAll();
  return users.map(formatUser);
}

async function registerUser({ name, email, password }) {
  const existingUser = await usersRepository.findByEmail(email);
  if (existingUser) {
    throw new ConflictError('E-mail already registered');
  }

  const passwordHash = await hashPassword(password);
  const newUser = await usersRepository.create({
    name,
    email,
    password: passwordHash,
  });

  logger.info(`User created with id ${newUser._id}`);

  const token = jwt.sign(
    { id: newUser._id.toString(), email: newUser.email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

  return {
    user: formatUser(newUser),
    token,
  };
}

async function authenticateUser({ email, password }) {
  const user = await usersRepository.findByEmail(email);
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user._id.toString(), email: user.email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

  return {
    user: formatUser(user),
    token,
  };
}

module.exports = {
  listUsers,
  registerUser,
  authenticateUser,
};
