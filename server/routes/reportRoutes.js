import { Router } from 'express';
import { getHealthReport, exportReportData } from '../controllers/reportController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getHealthReport);
router.get('/export', authenticate, exportReportData);

export default router;
