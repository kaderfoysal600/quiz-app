// controllers/paymentController.js

const Payment = require("../models/Payment");

// POST /api/payments
exports.createPayment = async (req, res) => {
  try {
    const { method, paymentNumber, amount, accountHolderName } = req.body;

    const payment = new Payment({
      method,
      paymentNumber,
      amount,
      accountHolderName
    });

    await payment.save();

    res.status(201).json({
      success: true,
      payment,
      message: 'Payment created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment'
    });
  }
};

// GET /api/payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();

    res.status(200).json({
      success: true,
      payments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve payments'
    });
  }
};
