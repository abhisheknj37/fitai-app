import { Router } from 'express';
import { getDashboardData, logActivity } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getDashboardData);
router.post('/log-activity', authenticate, logActivity);

export default router;
