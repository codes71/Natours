class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Failed 4---' : 'Error 5--';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
