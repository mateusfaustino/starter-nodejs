const logger = require('../utils/logger');
const { ApplicationError, ValidationError } = require('../utils/errors');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ValidationError) {
    logger.warn(`Validation error: ${err.message}`, err.details);
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details,
    });
  }

  if (err instanceof ApplicationError) {
    logger.warn(`${err.name}: ${err.message}`);
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  logger.error('Unexpected error occurred', err);
  return res.status(500).json({
    message: 'Internal server error',
  });
}

module.exports = errorHandler;
