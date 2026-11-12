import { Router } from 'express';
import authRoutes from './authRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import aiRoutes from './aiRoutes.js';
import workoutRoutes from './workoutRoutes.js';
import nutritionRoutes from './nutritionRoutes.js';
import trackingRoutes from './trackingRoutes.js';
import reportRoutes from './reportRoutes.js';
import emergencyRoutes from './emergencyRoutes.js';
import communityRoutes from './communityRoutes.js';
import musicRoutes from './musicRoutes.js';

const apiRouter = Router();

// Health Check Endpoint
apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    app: 'FitAI - Personal Health & Fitness Platform API'
  });
});

// Mount modules
apiRouter.use('/auth', authRoutes);
apiRouter.use('/dashboard', dashboardRoutes);
apiRouter.use('/ai', aiRoutes);
apiRouter.use('/workouts', workoutRoutes);
apiRouter.use('/nutrition', nutritionRoutes);
apiRouter.use('/tracking', trackingRoutes);
apiRouter.use('/reports', reportRoutes);
apiRouter.use('/emergency', emergencyRoutes);
apiRouter.use('/community', communityRoutes);
apiRouter.use('/music', musicRoutes);

export default apiRouter;
