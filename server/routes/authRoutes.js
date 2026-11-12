import { Router } from 'express';
import { login, register, getProfile, updateProfile, updateAvatar } from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { authenticate } from '../middleware/auth.js';
import { validateHealthMetrics, validateRequiredFields } from '../middleware/validation.js';
import { uploadImage } from '../middleware/upload.js';

const router = Router();

router.post('/login', authLimiter, validateRequiredFields(['email', 'password']), login);
router.post('/register', authLimiter, validateRequiredFields(['name', 'email', 'password']), register);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validateHealthMetrics, updateProfile);
router.post('/avatar', authenticate, uploadImage.single('avatar'), updateAvatar);

export default router;
