const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');

// GET /api/donor/profile
router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// PATCH /api/donor/availability
router.patch('/availability', auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { isAvailable: req.body.isAvailable }, { new: true });
  res.json({ isAvailable: user.isAvailable });
});

// GET /api/donor/history
router.get('/history', auth, async (req, res) => {
  // TODO: Replace with real donation history from DB
  res.json({ history: [] });
});

// GET /api/donor/badges
router.get('/badges', auth, async (req, res) => {
  // TODO: Replace with real badges from DB
  res.json({ badges: [] });
});

module.exports = router;
