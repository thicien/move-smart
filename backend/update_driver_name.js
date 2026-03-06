const sequelize = require('./src/config/database');

async function addDriverNameColumn() {
  try {
    await sequelize.authenticate();
    const queryInterface = sequelize.getQueryInterface();

    console.log('Adding driver_name column...');
    await queryInterface.addColumn('Buses', 'driver_name', {
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

addDriverNameColumn();
