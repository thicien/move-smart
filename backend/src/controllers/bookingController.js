const { Booking, Schedule, Payment, Bus, Route, Company } = require('../models');
const { Op } = require('sequelize');
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

exports.searchSchedules = async (req, res) => {
  try {
    const { from, to, date, passengers } = req.query;

    const routeWhere = {};
    if (from) routeWhere.origin = { [Op.like]: `%${from}%` };
    if (to) routeWhere.destination = { [Op.like]: `%${to}%` };

    const scheduleWhere = {};
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      scheduleWhere.departure_time = {
        [Op.between]: [startOfDay, endOfDay]
      };
    }
    
    if (passengers) {
      scheduleWhere.available_seats = { [Op.gte]: parseInt(passengers) };
    }

    const schedules = await Schedule.findAll({
      where: scheduleWhere,
      include: [
        { 
          model: Route, 
          where: routeWhere,
          attributes: ['id', 'name', 'code', 'origin', 'destination', 'distance', 'estimated_duration'] 
        },
        { 
          model: Bus, 
          attributes: ['id', 'license_plate', 'capacity', 'image_url'],
          include: [
            { model: Company, attributes: ['id', 'name'] }
          ]
        }
      ],
      order: [['departure_time', 'ASC']]
    });

    // Transform into frontend friendly format
    const results = schedules.map(s => {
      const depTime = new Date(s.departure_time);
      const arrTime = new Date(s.arrival_time);
      return {
        id: s.id,
        company: s.Bus?.Company?.name || 'Unknown Operator',
        route: s.Route,
        bus: s.Bus,
        departure: depTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        arrival: arrTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        raw_departure: s.departure_time,
        price: s.price,
        seats: s.available_seats,
        rating: 4.5 // Mock rating for UI aesthetics until review system is built
      };
    });

    res.json(results);
  } catch (error) {
    console.error('Search schedules error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    const { ticket_code } = req.params;
    const booking = await Booking.findOne({
      where: { ticket_code },
      include: [
        { 
          model: Schedule,
          include: [
            { model: Route },
            { model: Bus, include: [Company] }
          ]
        },
        { model: Payment }
      ]
    });
    
    if (!booking) return res.status(404).json({ message: 'Ticket not found' });
    
    // Security check - ensure only the booking owner or admin can view this
    if (booking.user_id !== req.user.id && req.user.role !== 'government' && req.user.role !== 'company_admin') {
       return res.status(403).json({ message: 'Not authorized to view this ticket' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
