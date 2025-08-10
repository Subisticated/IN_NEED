const Organ = require('../models/Organ');
const User = require('../models/User');

exports.createOrgan = async (req, res) => {
  try {
    const { organType, location, isDeceased } = req.body;
    let allowed = false;
    if (isDeceased) {
      allowed = ['Hospital', 'VerifiedSource'].includes(req.user.role);
    } else {
      allowed = ['Donor', 'Hospital'].includes(req.user.role);
    }
    if (!allowed) return res.status(403).json({ message: 'Not allowed' });
    const organ = await Organ.create({
      organType,
      location,
      isDeceased,
      createdBy: req.user.id,
      donor: !isDeceased ? req.user.id : undefined,
      ttl: isDeceased ? new Date(Date.now() + 6 * 60 * 60 * 1000) : undefined // 6h default
    });
    res.status(201).json(organ);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getOrgans = async (req, res) => {
  try {
    const { type, isDeceased, location, availableAfter, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const filter = {};
    if (type) filter.organType = type;
    if (isDeceased !== undefined) filter.isDeceased = isDeceased === 'true';
    if (location) filter.location = location;
    if (availableAfter) filter.ttl = { $gte: new Date(availableAfter) };
    const organs = await Organ.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(organs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateOrgan = async (req, res) => {
  try {
    const organ = await Organ.findById(req.params.id);
    if (!organ) return res.status(404).json({ message: 'Not found' });
    if (String(organ.createdBy) !== req.user.id && req.user.role !== 'Admin')
      return res.status(403).json({ message: 'Not allowed' });
    Object.assign(organ, req.body);
    await organ.save();
    res.json(organ);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.deleteOrgan = async (req, res) => {
  try {
    const organ = await Organ.findById(req.params.id);
    if (!organ) return res.status(404).json({ message: 'Not found' });
    if (String(organ.createdBy) !== req.user.id && req.user.role !== 'Admin')
      return res.status(403).json({ message: 'Not allowed' });
    await organ.remove();
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.verifyOrgan = async (req, res) => {
  try {
    const organ = await Organ.findById(req.params.id);
    if (!organ) return res.status(404).json({ message: 'Not found' });
    if (!['Admin', 'Hospital'].includes(req.user.role))
      return res.status(403).json({ message: 'Not allowed' });
    organ.verified = true;
    await organ.save();
    res.json({ message: 'Organ verified' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
