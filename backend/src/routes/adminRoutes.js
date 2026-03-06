const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Official Routes (Government only)
router.post('/routes', protect, authorize('government'), adminController.createOfficialRoute);
router.get('/routes', protect, authorize('government', 'company_admin'), adminController.getOfficialRoutes);
router.put('/routes/:id', protect, authorize('government'), adminController.updateOfficialRoute);
router.patch('/routes/:id/status', protect, authorize('government'), adminController.updateRouteStatus);
router.delete('/routes/:id', protect, authorize('government'), adminController.deleteOfficialRoute);

module.exports = router;
