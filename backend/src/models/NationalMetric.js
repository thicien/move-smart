const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NationalMetric = sequelize.define('NationalMetric', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  total_active_buses: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  total_tickets_sold: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  active_high_alerts: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['timestamp']
    }
  ]
});

module.exports = NationalMetric;
