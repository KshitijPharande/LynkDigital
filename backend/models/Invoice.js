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
  advanceAmount: { type: Number, required: true },
  remainingBalance: { type: Number, required: true },
  fullAmount: { type: Number, required: true },
  lineItems: [
    {
      description: String,
      amount: Number,
    }
  ],
  createdAt: { type: Date, default: Date.now },
  note: { type: String },
  bankName: String,
  accountNumber: String,
  paymentType: { type: String, enum: ['bank_transfer', 'cash', 'upi', 'cheque', 'other'], default: 'bank_transfer' },
});

module.exports = mongoose.model('Invoice', invoiceSchema); 