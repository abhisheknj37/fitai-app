import { Router } from 'express';
import { getTrackingData, updateWater } from '../controllers/trackingController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getTrackingData);
router.post('/water', authenticate, updateWater);

export default router;
