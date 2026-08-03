import express from 'express';
import { getOrganization, inviteMember } from '../controllers/organizationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getOrganization);
router.post('/invite', protect, inviteMember);

export default router;
