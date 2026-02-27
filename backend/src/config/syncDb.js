const { sequelize } = require('../models');

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');

    // Sync all models
    // force: false ensures we don't drop existing tables
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');

    process.exit(0);
  } catch (error) {
    console.error('Initial sync error:', error);
    process.exit(1);
  }
}

syncDatabase();
