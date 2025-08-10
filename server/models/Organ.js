const mongoose = require('mongoose');

const organSchema = new mongoose.Schema({
  organType: { type: String, required: true },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['available', 'matched', 'expired'], default: 'available' },
  location: { type: String, required: true },
  ttl: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  verified: { type: Boolean, default: false },
  isDeceased: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

organSchema.index({ ttl: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { isDeceased: true } });

module.exports = mongoose.model('Organ', organSchema);
