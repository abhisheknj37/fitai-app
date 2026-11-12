import { Router } from 'express';
import { getEmergencyData, triggerSosAlert, cancelSosAlert, addContact, deleteContact } from '../controllers/emergencyController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getEmergencyData);
router.post('/sos', authenticate, triggerSosAlert);
router.post('/cancel-sos', authenticate, cancelSosAlert);
router.post('/contacts', authenticate, addContact);
router.delete('/contacts/:id', authenticate, deleteContact);

export default router;
