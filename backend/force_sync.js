const { sequelize } = require('./src/models');

async function syncDb() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
    await sequelize.sync({ alter: true });
    console.log('Database synced with alter: true');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing:', error);
    process.exit(1);
  }
}

syncDb();
