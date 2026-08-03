import express from 'express';
import { generateReport, exportCsv } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/pdf', protect, generateReport);
router.get('/csv', protect, exportCsv);

export default router;
