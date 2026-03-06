const sequelize = require('./src/config/database');

async function addScheduleDrivers() {
  try {
    await sequelize.authenticate();
    const queryInterface = sequelize.getQueryInterface();

    console.log('Adding driver_name and driver_phone columns to Schedules...');
    await queryInterface.addColumn('Schedules', 'driver_name', {
      type: require('sequelize').DataTypes.STRING,
      allowNull: true,
    }).catch(err => console.log('Notice:', err.message));

    await queryInterface.addColumn('Schedules', 'driver_phone', {
      type: require('sequelize').DataTypes.STRING,
      allowNull: true,
    }).catch(err => console.log('Notice:', err.message));

    console.log('Migration completed.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit();
  }
}

addScheduleDrivers();
