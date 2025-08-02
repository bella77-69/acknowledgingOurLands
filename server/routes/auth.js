const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ error: 'User registration failed' });
    }
});

// Login
router.post('/login', async (req, res) => {
  console.log('Login attempt with:', req.body); // Log incoming request
  
  const { username, password } = req.body;
  if (!username || !password) {
    console.log('Missing credentials');
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const user = await User.findOne({ 
      where: { username },
      attributes: ['id', 'username', 'password'] // Explicitly select fields
    });
    
    console.log('Found user:', user ? user.username : 'none');
    
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful for:', user.username);
    
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ where: { username } });
//         if (!user) return res.status(404).json({ error: 'User not found' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//         const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({ token });
//     } catch (err) {
//         res.status(500).json({ error: 'Login failed' });
//     }
// });

// Save Land Acknowledgment
router.post('/acknowledgments', async (req, res) => {
    const { token, acknowledgment } = req.body;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.acknowledgments = [...user.acknowledgments, acknowledgment];
        await user.save();
        res.status(200).json({ message: 'Acknowledgment saved' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save acknowledgment' });
    }
});

module.exports = router;
