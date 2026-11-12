import { Router } from 'express';
import { getChatHistory, sendMessage, clearChat } from '../controllers/aiController.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/history', authenticate, getChatHistory);
router.post('/chat', authenticate, aiLimiter, sendMessage);
router.delete('/clear', authenticate, clearChat);

export default router;
