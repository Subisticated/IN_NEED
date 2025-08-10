const express = require('express');
const router = express.Router();
const organController = require('../controllers/organController');
const { auth, requireRole } = require('../middleware/auth');

router.post('/', auth, requireRole('Donor', 'Hospital'), (req, res, next) => {
  req.body.isDeceased = false;
  next();
}, organController.createOrgan);
router.get('/', organController.getOrgans);
router.put('/:id', auth, organController.updateOrgan);
router.delete('/:id', auth, organController.deleteOrgan);
router.patch('/:id/verify', auth, requireRole('Admin', 'Hospital'), organController.verifyOrgan);

module.exports = router;
