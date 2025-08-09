import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  loginUser,
  validateUser,
  registerUser,
  getUsers,
  getUserById
} from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Protected routes (require valid JWT)
router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);
router.post('/validation', authMiddleware, validateUser);

export default router;