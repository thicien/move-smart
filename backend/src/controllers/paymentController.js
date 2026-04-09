const { Payment, Booking, Alert } = require('../models');

// Simulating a webhook or payment confirmation endpoint (MoMo/Airtel Callback)
exports.confirmPayment = async (req, res) => {
  try {
    // In a real scenario, this would handle callbacks from Tap&Go, MTN MoMo, etc.
    const { transaction_id, status, payment_id, paid_amount } = req.body;

    const payment = await Payment.findByPk(payment_id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    // The TransactionAuditor (Anti-Ghost Ticket Check)
    if (status === 'success') {
      if (paid_amount !== undefined && parseFloat(paid_amount) < parseFloat(payment.amount)) {
         payment.status = 'failed';
         await payment.save();
         
         // Flag as Security Violation
         await Alert.create({
            bus_id: null,
            company_id: null,
            type: 'Ghost Ticket Attempt',
            severity: 'High',
            status: 'active',
            description: `Transaction ${transaction_id} attempted to underpay. Expected: ${payment.amount}, Received: ${paid_amount}`
         });
         
         return res.status(400).json({ message: 'Security Violation: Paid amount is less than official fare.' });
      }
      // If it matches, the ledger variables SystemRevenue (tax_amount) and CompanyShare (company_revenue) are officially unlocked!
    }

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

    res.json({ message: 'Payment updated and formally recorded in ledger', payment });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
