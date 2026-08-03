import express from 'express';
import { createFeedback, deleteFeedback, listFeedback, updateFeedback, analytics } from '../controllers/feedbackController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, listFeedback);
router.post('/', protect, createFeedback);
router.put('/:id', protect, updateFeedback);
router.delete('/:id', protect, deleteFeedback);
router.get('/analytics', protect, analytics);

export default router;
