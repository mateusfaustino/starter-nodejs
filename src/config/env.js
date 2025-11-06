const dotenv = require('dotenv');
const logger = require('../utils/logger');

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

if (!env.mongoUri) {
  const defaultUri = 'mongodb://127.0.0.1:27017/starter-nodejs';
  logger.warn(`Environment variable MONGO_URI is not defined. Using default ${defaultUri}.`);
  env.mongoUri = defaultUri;
}

if (!env.jwtSecret) {
  logger.warn('Environment variable JWT_SECRET is not defined. Using insecure default value for development.');
  env.jwtSecret = 'change-me-in-production';
}

module.exports = env;
