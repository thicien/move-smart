const { Booking, Schedule, Payment } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.createBooking = async (req, res) => {
  try {
    const { schedule_id, seat_number, amount, method } = req.body;
    const user_id = req.user.id; // from auth middleware

    // Check if schedule exists and has available seats
    const schedule = await Schedule.findByPk(schedule_id);
    if (!schedule || schedule.available_seats <= 0) {
      return res.status(400).json({ message: 'Schedule not found or full' });
    }

    // Check if seat is already booked
    const existingBooking = await Booking.findOne({ where: { schedule_id, seat_number } });
    if (existingBooking) {
      return res.status(400).json({ message: 'Seat already booked' });
    }

    const ticket_code = uuidv4().slice(0, 8).toUpperCase();

    // Create booking
    const booking = await Booking.create({
      user_id,
      schedule_id,
      seat_number,
      ticket_code,
      payment_status: 'pending'
    });

    // Create payment record
    const payment = await Payment.create({
      booking_id: booking.id,
      amount: amount || schedule.price,
      method,
      status: 'pending' // pending until webhook or confirmation
    });

    // Reduce available seats
    schedule.available_seats -= 1;
    await schedule.save();

    res.status(201).json({ message: 'Booking created successfully', booking, payment });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const user_id = req.user.id;
    const bookings = await Booking.findAll({
      where: { user_id },
      include: [
        { model: Schedule },
        { model: Payment }
      ]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
