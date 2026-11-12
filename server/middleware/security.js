import helmet from 'helmet';
import cors from 'cors';

export const configureSecurityHeaders = () => {
  return helmet({
    contentSecurityPolicy: false, // Disabled for local development and inline previews
    crossOriginEmbedderPolicy: false
  });
};

export const configureCors = () => {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://localhost:5000',
    'https://fitai-platform.onrender.com',
    process.env.RENDER_EXTERNAL_URL,
    process.env.CLIENT_URL
  ].filter(Boolean);

  return cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl or same-origin)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  });
};
