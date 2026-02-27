require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bus Tracking System API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
