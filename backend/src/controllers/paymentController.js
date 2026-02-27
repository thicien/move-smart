const { Payment, Booking } = require('../models');

// Simulating a webhook or payment confirmation endpoint
exports.confirmPayment = async (req, res) => {
  try {
    // In a real scenario, this would handle callbacks from Tap&Go, MTN MoMo, etc.
    const { transaction_id, status, payment_id } = req.body;

    const payment = await Payment.findByPk(payment_id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    payment.status = status;
    payment.transaction_id = transaction_id;
    await payment.save();

    if (status === 'success') {
      const booking = await Booking.findByPk(payment.booking_id);
      if (booking) {
        booking.payment_status = 'completed';
        await booking.save();
      }
    }

    res.json({ message: 'Payment updated', payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
