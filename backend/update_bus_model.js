const sequelize = require('./src/config/database');

async function addBusColumns() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const queryInterface = sequelize.getQueryInterface();

    console.log('Adding route_id column...');
    await queryInterface.addColumn('Buses', 'route_id', {
      type: require('sequelize').DataTypes.INTEGER,
      allowNull: true,
    }).catch(err => console.log('route_id column might already exist:', err.message));

    console.log('Adding seat_price column...');
    await queryInterface.addColumn('Buses', 'seat_price', {
      type: require('sequelize').DataTypes.FLOAT,
      allowNull: true,
    }).catch(err => console.log('seat_price column might already exist:', err.message));

    console.log('Adding image_url column...');
    await queryInterface.addColumn('Buses', 'image_url', {
      type: require('sequelize').DataTypes.STRING,
      allowNull: true,
    }).catch(err => console.log('image_url column might already exist:', err.message));

    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Unable to connect to the database or apply migration:', error);
  } finally {
    await sequelize.close();
  }
}

addBusColumns();
