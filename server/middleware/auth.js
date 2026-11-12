import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fitai_super_secret_jwt_key_2026_fitness_health';

/**
 * Authentication Middleware
 * Validates JWT Bearer tokens and attaches decoded user to req.user.
 * Falls back to demo user if requested or unauthenticated for full demo accessibility.
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication token. Please log in again.'
      });
    }
  }

  // Allow optional or demo mode for seamless interaction
  // Default user context matches Abhishek N J from the UI mockup
  req.user = {
    id: 'user_abhishek_01',
    name: 'Abhishek N J',
    email: 'abhisheknj@example.com',
    role: 'Premium User',
    isDemo: true
  };
  next();
};

/**
 * Require Strict Authentication (for sensitive modifications)
 */
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please provide a valid Bearer token.'
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed. Please log in again.'
    });
  }
};
