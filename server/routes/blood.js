const express = require('express');
const router = express.Router();
const bloodController = require('../controllers/bloodController');
const { auth, requireRole } = require('../middleware/auth');

router.post('/request', auth, requireRole('Hospital'), bloodController.createBloodRequest);
router.get('/search', bloodController.searchBloodRequests);
router.post('/register', auth, requireRole('Donor'), bloodController.registerToDonate);

module.exports = router;
