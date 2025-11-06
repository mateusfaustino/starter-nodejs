const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../utils/logger');

mongoose.set('strictQuery', true);

async function connectDatabase() {
  try {
    await mongoose.connect(env.mongoUri, {
      autoIndex: true,
    });
    logger.info('MongoDB connection established');
  } catch (error) {
    logger.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

module.exports = {
  connectDatabase,
};
