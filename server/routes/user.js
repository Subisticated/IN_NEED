const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Get current user profile
router.get('/me', auth.auth, userController.getMe);

// Update user profile
router.put('/:id', auth.auth, userController.updateUser);

module.exports = router;
