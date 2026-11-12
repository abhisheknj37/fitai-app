import { Router } from 'express';
import { getNutrition, addMeal, analyzeFoodImage } from '../controllers/nutritionController.js';
import { authenticate } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';

const router = Router();

router.get('/', authenticate, getNutrition);
router.post('/meals', authenticate, addMeal);
router.post('/analyze-image', authenticate, uploadImage.single('image'), analyzeFoodImage);

export default router;
