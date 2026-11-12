import { Router } from 'express';
import { getWorkouts, setLevel, generateNewPlan } from '../controllers/workoutController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getWorkouts);
router.post('/level', authenticate, setLevel);
router.post('/generate', authenticate, generateNewPlan);

export default router;
