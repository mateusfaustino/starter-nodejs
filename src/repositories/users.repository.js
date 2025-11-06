const UserModel = require('../models/user.model');

async function findAll() {
  return UserModel.find().select('-password').lean();
}

async function findByEmail(email) {
  return UserModel.findOne({ email }).lean();
}

async function findById(id) {
  return UserModel.findById(id).lean();
}

async function create(userData) {
  const user = await UserModel.create(userData);
  return user.toObject();
}

module.exports = {
  findAll,
  findByEmail,
  findById,
  create,
};
