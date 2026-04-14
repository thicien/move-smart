require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

const companyRoutes = require('./src/routes/companyRoutes');
app.use('/api/companies', companyRoutes);

const bookingRoutes = require('./src/routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);

const paymentRoutes = require('./src/routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

const trackingRoutes = require('./src/routes/trackingRoutes');
app.use('/api/tracking', trackingRoutes);

const adminRoutes = require('./src/routes/adminRoutes');
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bus Tracking System API is running' });
});

const { sequelize } = require('./src/models');

console.time('Sequelize Sync');
sequelize.sync()
  .then(() => {
    console.timeEnd('Sequelize Sync');
    console.log('Database connected successfully.');
    
    // Seed Tariffs if empty
    const { TariffSetting } = require('./src/models');
    TariffSetting.count().then(count => {
      if (count === 0) {
        TariffSetting.bulkCreate([
          { category: 'URBAN_KIGALI', rate_per_km: 41.58, minimum_fare: 200 },
          { category: 'INTERCITY', rate_per_km: 59.28, minimum_fare: 0 },
          { category: 'SECONDARY', rate_per_km: 59.28, minimum_fare: 0 }
        ]).then(() => console.log('Seeded default RURA Tariffs.'));
      }
    });

    // Start background services
    const pulseService = require('./src/services/pulseService');
    pulseService.start();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
