import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from:
    // 1. Authorization header
    // 2. Cookies (if using)
    // 3. URL query parameter (for special cases)
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                 req.cookies?.token || 
                 req.query?.token;

    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Authentication required' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get fresh user data
    const user = await userModel.findUserByIdSafe(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    // Attach user to request
    req.user = user;
    req.id = user.id;
    req.token = token;
    
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    
    let errorMessage = 'Invalid token';
    if (err.name === 'TokenExpiredError') {
      errorMessage = 'Token expired';
    } else if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Malformed token';
    }

    res.status(401).json({ 
      success: false,
      error: errorMessage 
    });
  }
};