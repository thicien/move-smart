const sequelize = require('../config/database');
const User = require('./User');
const Company = require('./Company');
const Bus = require('./Bus');
const Route = require('./Route');
const Schedule = require('./Schedule');
const Booking = require('./Booking');
const Payment = require('./Payment');

// Associations
User.hasMany(Company, { foreignKey: 'admin_id' });
Company.belongsTo(User, { foreignKey: 'admin_id' });

Company.hasMany(Bus, { foreignKey: 'company_id' });
Bus.belongsTo(Company, { foreignKey: 'company_id' });

Route.hasMany(Bus, { foreignKey: 'route_id' });
Bus.belongsTo(Route, { foreignKey: 'route_id' });

Company.hasMany(Route, { foreignKey: 'company_id' });
Route.belongsTo(Company, { foreignKey: 'company_id' });

Bus.hasMany(Schedule, { foreignKey: 'bus_id' });
Schedule.belongsTo(Bus, { foreignKey: 'bus_id' });

Route.hasMany(Schedule, { foreignKey: 'route_id' });
Schedule.belongsTo(Route, { foreignKey: 'route_id' });

User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Schedule.hasMany(Booking, { foreignKey: 'schedule_id' });
Booking.belongsTo(Schedule, { foreignKey: 'schedule_id' });

Booking.hasOne(Payment, { foreignKey: 'booking_id' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id' });

module.exports = {
  sequelize,
  User,
  Company,
  Bus,
  Route,
  Schedule,
  Booking,
  Payment,
};
