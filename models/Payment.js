// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['bkash', 'nogod'],
    required: true
  },
  paymentNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  accountHolderName: {
    type: String,
    required: true
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
