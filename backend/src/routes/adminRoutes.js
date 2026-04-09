const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Official Routes (Government only)
router.get('/dashboard-stats', protect, authorize('government'), adminController.getDashboardStats);
router.get('/national-overview', protect, authorize('government'), adminController.getNationalOverview);
router.post('/routes', protect, authorize('government'), adminController.createOfficialRoute);
router.get('/routes', protect, authorize('government', 'company_admin'), adminController.getOfficialRoutes);
router.put('/routes/:id', protect, authorize('government'), adminController.updateOfficialRoute);
router.patch('/routes/:id/status', protect, authorize('government'), adminController.updateRouteStatus);
router.delete('/routes/:id', protect, authorize('government'), adminController.deleteOfficialRoute);

// Tariff Management
router.get('/tariffs', protect, authorize('government', 'company_admin'), adminController.getTariffs);
router.put('/tariffs/:id', protect, authorize('government'), adminController.updateTariff);

module.exports = router;
