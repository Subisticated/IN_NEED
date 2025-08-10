const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bloodType: { type: String, required: true },
  units: { type: Number, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['open', 'matched', 'closed'], default: 'open' },
  matchedDonors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  neededBy: { type: Date, required: true }
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
