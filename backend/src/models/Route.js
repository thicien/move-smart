const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Route = sequelize.define('Route', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Suspended'),
    defaultValue: 'Active',
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distance: {
    type: DataTypes.FLOAT,
    allowNull: true, // in km
  },
  estimated_duration: {
    type: DataTypes.INTEGER,
    allowNull: true, // in minutes
  },
  base_fare: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  min_fare: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  max_fare: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  tax_percentage: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

module.exports = Route;
