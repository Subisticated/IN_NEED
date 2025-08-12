const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role, isVerified: true });
    res.status(201).json({ message: 'Registered successfully. You can now log in.' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) return res.status(400).json({ message: 'Invalid credentials or not verified' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { _id: user._id, name: user.name, role: user.role } });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.forgotPassword = async (req, res) => {
  res.status(501).json({ message: 'Password reset is currently disabled.' });
};

exports.resetPassword = async (req, res) => {
  res.status(501).json({ message: 'Password reset is currently disabled.' });
};
