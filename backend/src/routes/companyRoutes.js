const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/authMiddleware');

const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/buses');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Companies
router.post('/', protect, authorize('company_admin', 'government'), companyController.registerCompany);
router.get('/', protect, companyController.getCompanies);

// Buses
router.post('/buses', protect, authorize('company_admin'), upload.single('image'), companyController.addBus);
router.put('/buses/:id', protect, authorize('company_admin'), upload.single('image'), companyController.updateBus);
router.delete('/buses/:id', protect, authorize('company_admin'), companyController.deleteBus);
router.get('/:company_id/buses', protect, companyController.getCompanyBuses);

// Routes
router.post('/routes', protect, authorize('company_admin'), companyController.addRoute);
router.get('/:company_id/routes', protect, companyController.getCompanyRoutes);

// Schedules
router.post('/schedules', protect, authorize('company_admin'), companyController.addSchedule);
router.get('/schedules/search', protect, companyController.getSchedules);

module.exports = router;
