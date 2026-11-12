import { Router } from 'express';
import { getPlaylists, getPlaylistById, searchMusic } from '../controllers/musicController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/playlists', authenticate, getPlaylists);
router.get('/playlists/:id', authenticate, getPlaylistById);
router.get('/search', authenticate, searchMusic);

export default router;
