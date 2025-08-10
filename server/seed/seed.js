const mongoose = require('mongoose');
const User = require('../models/User');
const Organ = require('../models/Organ');
const BloodRequest = require('../models/BloodRequest');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany({});
  await Organ.deleteMany({});
  await BloodRequest.deleteMany({});

  const admin = await User.create({ name: 'Admin', email: 'admin@inneed.com', password: '$2a$10$123456789012345678901uQwK1', role: 'Admin', isVerified: true });
  const hospital = await User.create({ name: 'City Hospital', email: 'hospital@inneed.com', password: '$2a$10$123456789012345678901uQwK1', role: 'Hospital', isVerified: true });
  const donor = await User.create({ name: 'John Donor', email: 'donor@inneed.com', password: '$2a$10$123456789012345678901uQwK1', role: 'Donor', isVerified: true });
  const verifiedSource = await User.create({ name: 'Verified Source', email: 'source@inneed.com', password: '$2a$10$123456789012345678901uQwK1', role: 'VerifiedSource', isVerified: true });

  await Organ.create({ organType: 'Kidney', donor: donor._id, status: 'available', location: 'City A', isDeceased: false, createdBy: donor._id, verified: true });
  await Organ.create({ organType: 'Heart', status: 'available', location: 'City B', isDeceased: true, createdBy: hospital._id, verified: false, ttl: new Date(Date.now() + 2*60*60*1000) });

  await BloodRequest.create({ hospital: hospital._id, bloodType: 'A+', units: 2, location: 'City A', neededBy: new Date(Date.now() + 24*60*60*1000) });

  console.log('Seed data inserted');
  process.exit();
}

seed();
