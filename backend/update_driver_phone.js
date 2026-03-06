const sequelize = require('./src/config/database');

async function addDriverPhoneColumn() {
  try {
    await sequelize.authenticate();
    const queryInterface = sequelize.getQueryInterface();

    console.log('Adding driver_phone column...');
    await queryInterface.addColumn('Buses', 'driver_phone', {
      type: require('sequelize').DataTypes.STRING,
      allowNull: true,
    }).catch(err => console.log('Notice:', err.message));

    console.log('Migration completed.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await sequelize.close();
  }
}

addDriverPhoneColumn();
