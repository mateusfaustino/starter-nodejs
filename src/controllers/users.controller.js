const usersService = require('../services/users.service');

async function listUsers(req, res, next) {
  try {
    const users = await usersService.listUsers();
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { confirmPassword, ...userData } = req.body;
    const result = await usersService.registerUser(userData);
    res.status(201).json({ message: 'User created successfully', data: result });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await usersService.authenticateUser(req.body);
    res.status(200).json({ message: 'Authentication successful', data: result });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listUsers,
  createUser,
  login,
};
