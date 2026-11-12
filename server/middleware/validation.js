import { AppError } from './errorHandler.js';

/**
 * Validates request body contains specified required fields
 */
export const validateRequiredFields = (fields = []) => {
  return (req, res, next) => {
    const missing = [];
    for (const field of fields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return next(
        new AppError(`Missing required field(s): ${missing.join(', ')}`, 400)
      );
    }
    next();
  };
};

/**
 * Validates Profile / Health metrics inputs
 */
export const validateHealthMetrics = (req, res, next) => {
  const { age, height, weight } = req.body;
  
  if (age !== undefined && (isNaN(age) || age < 10 || age > 120)) {
    return next(new AppError('Age must be a valid number between 10 and 120.', 400));
  }
  if (height !== undefined && (isNaN(height) || height < 50 || height > 250)) {
    return next(new AppError('Height must be a valid number in cm between 50 and 250.', 400));
  }
  if (weight !== undefined && (isNaN(weight) || weight < 20 || weight > 300)) {
    return next(new AppError('Weight must be a valid number in kg between 20 and 300.', 400));
  }

  next();
};
