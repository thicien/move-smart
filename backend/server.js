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
          { category: 'URBAN_KIGALI', rate_per_km: 59.28, minimum_fare: 200 },
          { category: 'INTERCITY', rate_per_km: 41.58, minimum_fare: 0 },
          { category: 'SECONDARY', rate_per_km: 41.58, minimum_fare: 0 }
        ]).then(() => console.log('Seeded default RURA Tariffs.'));
      }
    });
    

    // Start background services
    const pulseService = require('./src/services/pulseService');
    pulseService.start();

    // Ensure default admin users exist
    const { User } = require('./src/models');
    const ensureDefaultUsers = async () => {
      try {
        // Default Government Admin
        let govAdmin = await User.findOne({ where: { email: 'admin@gov.rw' } });
        if (!govAdmin) {
          await User.create({
            name: 'Government Admin',
            email: 'admin@gov.rw',
            password: 'password123',
            role: 'government',
            phone: '0000000000'
          });
          console.log('✅ Default government admin created (admin@gov.rw / password123)');
        } else if (govAdmin.role !== 'government' || govAdmin.password !== 'password123') {
          await govAdmin.update({ role: 'government', password: 'password123' });
          console.log('✅ Restored default credentials for admin@gov.rw');
        }

        // Default System Admin
        let systemAdmin = await User.findOne({ where: { email: 'admin@movesmart.com' } });
        if (!systemAdmin) {
          await User.create({
            name: 'System Administrator',
            email: 'admin@movesmart.com',
            password: 'adminpassword',
            role: 'system_admin',
            phone: '1111111111'
          });
          console.log('✅ Default system admin created (admin@movesmart.com / adminpassword)');
        } else if (systemAdmin.role !== 'system_admin' || systemAdmin.password !== 'adminpassword') {
          await systemAdmin.update({ role: 'system_admin', password: 'adminpassword' });
          console.log('✅ Restored default credentials for admin@movesmart.com');
        }
      } catch (err) {
        console.error('Error seeding default users:', err);
      }
    };
    ensureDefaultUsers();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
