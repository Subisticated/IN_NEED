const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Organ = require('../models/Organ');
const BloodRequest = require('../models/BloodRequest');
const { auth, requireRole } = require('../middleware/auth');

// Block/unblock user
router.patch('/user/:id/block', auth, requireRole('Admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.blocked = !user.blocked;
    await user.save();
    res.json({ message: user.blocked ? 'Blocked' : 'Unblocked' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// View reports (organs, blood, users)
router.get('/reports', auth, requireRole('Admin'), async (req, res) => {
  try {
    const users = await User.countDocuments();
    const organs = await Organ.countDocuments();
    const blood = await BloodRequest.countDocuments();
    res.json({ users, organs, blood });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Monthly donation stats
router.get('/stats', auth, requireRole('Admin'), async (req, res) => {
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const organs = await Organ.countDocuments({ createdAt: { $gte: start } });
    const blood = await BloodRequest.countDocuments({ createdAt: { $gte: start } });
    res.json({ organs, blood });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
