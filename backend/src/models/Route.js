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
    allowNull: false,
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
}, {
  timestamps: true,
});

module.exports = Route;
