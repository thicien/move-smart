const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TariffSetting = sequelize.define('TariffSetting', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.ENUM('URBAN_KIGALI', 'INTERCITY', 'SECONDARY'),
    allowNull: false,
    unique: true
  },
  rate_per_km: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  minimum_fare: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  tax_percentage: {
    type: DataTypes.FLOAT,
    defaultValue: 5,
  }
}, {
  timestamps: true,
});

module.exports = TariffSetting;
