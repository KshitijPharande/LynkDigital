const mongoose = require('mongoose');

const monthlyPaymentSchema = new mongoose.Schema({
  month: Number,
  year: Number,
  paid: Boolean,
}, { _id: false });

const paymentProofSchema = new mongoose.Schema({
  month: Number,
  year: Number,
  url: String,
  public_id: String,
  format: String,
}, { _id: false });

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String },
  address: { type: String },
  typeOfWork: { type: String, enum: ['WebDev', 'DigitalMarketing'], required: true },
  // WebDev fields
  startDate: { type: Date },
  deliveryDate: { type: Date },
  status: { type: String, enum: ['inProgress', 'completed'] },
  // DigitalMarketing fields
  monthlyPayments: [monthlyPaymentSchema],
  paymentProofs: [paymentProofSchema],
  createdAt: { type: Date, default: Date.now },
  terminated: { type: Boolean, default: false },
  terminatedAt: { type: Date },
});

module.exports = mongoose.model('Client', clientSchema); 