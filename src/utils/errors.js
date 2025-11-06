class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ConflictError extends ApplicationError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
  }
}

class UnauthorizedError extends ApplicationError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

class NotFoundError extends ApplicationError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

class ValidationError extends ApplicationError {
  constructor(message = 'Validation error', details = []) {
    super(message, 422);
    this.details = details;
  }
}

module.exports = {
  ApplicationError,
  ConflictError,
  UnauthorizedError,
  NotFoundError,
  ValidationError,
};
