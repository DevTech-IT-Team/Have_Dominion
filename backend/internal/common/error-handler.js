const { logger } = require('./logger');

class AppError extends Error {
  constructor(message, statusCode, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'Internal server error';

  // Only log server errors (500), not client errors (400, 401, 403, 404)
  if (statusCode >= 500) {
    logger.error(message, {
      statusCode,
      code,
      path: req.path,
      method: req.method,
    });
  }

  res.status(statusCode).json({
    error: {
      code,
      message,
      timestamp: new Date().toISOString(),
    },
  });
};

module.exports = {
  AppError,
  errorHandler,
};