import express from 'express';

import acknowledgmentController from '../controllers/acknowledgmentController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, acknowledgmentController.create);
router.get('/', authMiddleware, acknowledgmentController.getAll);
router.put('/:id', authMiddleware, acknowledgmentController.update);
router.delete('/:id', authMiddleware, acknowledgmentController.remove);

export default router;