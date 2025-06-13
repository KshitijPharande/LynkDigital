const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  sender: {
    name: { type: String, default: 'Lynk Digital' },
    phone: { type: String, default: '8796644348' },
    email: { type: String, default: 'pharandekshitij@gmail.com' },
    address: { type: String, default: 'Pune' },
  },
  clientName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String },
  advanceAmount: { type: Number },
  remainingBalance: { type: Number },
  fullAmount: { type: Number },
  lineItems: [
    {
      description: String,
      amount: Number,
    }
  ],
  createdAt: { type: Date, default: Date.now },
  note: { type: String },
});

module.exports = mongoose.model('Invoice', invoiceSchema); 