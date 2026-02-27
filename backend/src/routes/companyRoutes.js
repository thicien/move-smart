const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Companies
router.post('/', protect, authorize('company_admin', 'government'), companyController.registerCompany);
router.get('/', protect, companyController.getCompanies);

// Buses
router.post('/buses', protect, authorize('company_admin'), companyController.addBus);
router.get('/:company_id/buses', protect, companyController.getCompanyBuses);

// Routes
router.post('/routes', protect, authorize('company_admin'), companyController.addRoute);
router.get('/:company_id/routes', protect, companyController.getCompanyRoutes);

// Schedules
router.post('/schedules', protect, authorize('company_admin'), companyController.addSchedule);
router.get('/schedules/search', protect, companyController.getSchedules);

module.exports = router;
