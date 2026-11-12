import rateLimit from 'express-rate-limit';

/**
 * General API Rate Limiter
 * 300 requests per 15-minute window per IP
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address, please try again after 15 minutes.'
  }
});

/**
 * Authentication Route Rate Limiter (Brute-force protection)
 * 30 login/register attempts per 15-minute window
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.'
  }
});

/**
 * AI Assistant Route Limiter
 * 60 AI queries per 10 minutes
 */
export const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'FitAI Assistant query limit reached for this session. Please wait a few moments.'
  }
});
