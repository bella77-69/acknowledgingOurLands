import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel.js';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await userModel.findUserByEmailWithPassword(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await userModel.comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user data (without password)
    const userData = {
      id: user.id,
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      created_at: user.created_at
    };

    res.json({
      success: true,
      token,
      user: userData
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      error: 'An error occurred during login' 
    });
  }
};

// Registration Controller
export const registerUser = async (req, res) => {
  const { full_name, username, email, password } = req.body;

  try {
    // Validate input
    if (!full_name || !username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await userModel.verifyUser(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create user (password is hashed in the model)
    const newUser = await userModel.registerUser(
      full_name,
      username,
      password,
      email
    );

    // Generate token for auto-login
    const token = generateToken(newUser.id);

    res.status(201).json({
      success: true,
      token,
      user: newUser
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Registration failed'
    });
  }
};

// User Validation (Protected Route)
export const validateUser = async (req, res) => {
  try {
    const user = await userModel.findUserByIdSafe(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error('Validation error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Failed to validate user' 
    });
  }
};

// Get All Users (Protected)
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get User by ID (Protected)
export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findUserById(req.params.id);
    res.json({ success: true, user });
  } catch (err) {
    res.status(404).json({ 
      success: false,
      error: err.message 
    });
  }
};