const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String},
  companyName: { type: String },
  address: { type: String },
  typeOfWork: { type: String, enum: ['WebDev', 'DigitalMarketing'], required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  firstCall: { type: Date, default: null },
  followUpCall: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', leadSchema); 