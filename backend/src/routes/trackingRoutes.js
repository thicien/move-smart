const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Update location (might be done by a GPS device or driver app, here protected by company_admin for simplicity)
router.put('/:bus_id/location', protect, authorize('company_admin'), trackingController.updateLocation);

// Get location (can be passenger or anyone)
router.get('/:bus_id/location', trackingController.getLocation);

// Send Notification (internal service or admin usually, testing endpoint)
router.post('/notify', protect, trackingController.sendNotification);

module.exports = router;
