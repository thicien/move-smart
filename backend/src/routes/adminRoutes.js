const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Official Routes (Government only)
router.post('/routes', protect, authorize('government'), adminController.createOfficialRoute);
router.get('/routes', protect, authorize('government'), adminController.getOfficialRoutes);

module.exports = router;
