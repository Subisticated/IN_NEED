const BloodRequest = require('../models/BloodRequest');
const User = require('../models/User');

exports.createBloodRequest = async (req, res) => {
  try {
    if (req.user.role !== 'Hospital') return res.status(403).json({ message: 'Only hospitals can post requests' });
    const { bloodType, units, location, neededBy } = req.body;
    const request = await BloodRequest.create({ hospital: req.user.id, bloodType, units, location, neededBy });
    res.status(201).json(request);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.searchBloodRequests = async (req, res) => {
  try {
    const { bloodType, location, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const filter = {};
    if (bloodType) filter.bloodType = bloodType;
    if (location) filter.location = location;
    const requests = await BloodRequest.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(requests);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.registerToDonate = async (req, res) => {
  try {
    if (req.user.role !== 'Donor') return res.status(403).json({ message: 'Only donors can register' });
    const { requestId } = req.body;
    const request = await BloodRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.matchedDonors.includes(req.user.id))
      return res.status(400).json({ message: 'Already registered' });
    request.matchedDonors.push(req.user.id);
    await request.save();
    res.json({ message: 'Registered as donor' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
