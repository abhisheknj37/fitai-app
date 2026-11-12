/**
 * Custom Operational Application Error
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 404 Route Not Found Middleware
 */
export const notFoundHandler = (req, res, next) => {
  next(new AppError(`Cannot find endpoint ${req.originalUrl} on this server.`, 404));
};

/**
 * Global Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  const isDev = process.env.NODE_ENV !== 'production';

  console.error(`[ERROR] [${req.method} ${req.originalUrl}]`, err.message);
  if (isDev && err.stack) {
    console.error(err.stack);
  }

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message || 'An unexpected internal server error occurred.',
    ...(isDev && { stack: err.stack }),
    timestamp: new Date().toISOString()
  });
};
