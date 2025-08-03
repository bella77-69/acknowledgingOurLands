import express from 'express';
import { 
  create, 
  getAll, 
  update, 
  remove 
} from '../controllers/acknowledgmentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, create);
router.get('/', authenticate, getAll);
router.put('/:id', authenticate, update);
router.delete('/:id', authenticate, remove);

export default router;