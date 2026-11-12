import { Router } from 'express';
import { getCommunityFeed, createPost, toggleLike, addComment, joinChallenge } from '../controllers/communityController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/feed', authenticate, getCommunityFeed);
router.post('/posts', authenticate, createPost);
router.post('/posts/:id/like', authenticate, toggleLike);
router.post('/posts/:id/comment', authenticate, addComment);
router.post('/challenge/join', authenticate, joinChallenge);

export default router;
