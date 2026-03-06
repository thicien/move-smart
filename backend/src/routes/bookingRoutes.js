const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/schedules/search', bookingController.searchSchedules); // Public or protect depending on needs, made public for passenger search
router.post('/', protect, bookingController.createBooking);
router.get('/my-bookings', protect, bookingController.getUserBookings);
router.get('/ticket/:ticket_code', protect, bookingController.getBookingDetails);

module.exports = router;
