const sequelize = require('./src/config/database');

async function addPricingColumnsToRoutes() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const queryInterface = sequelize.getQueryInterface();

    console.log('Adding base_fare column...');
    await queryInterface.addColumn('Routes', 'base_fare', {
      type: require('sequelize').DataTypes.FLOAT,
      defaultValue: 0,
    }).catch(err => console.log('base_fare column might already exist:', err.message));

    console.log('Adding min_fare column...');
    await queryInterface.addColumn('Routes', 'min_fare', {
      type: require('sequelize').DataTypes.FLOAT,
      defaultValue: 0,
    }).catch(err => console.log('min_fare column might already exist:', err.message));

    console.log('Adding max_fare column...');
    await queryInterface.addColumn('Routes', 'max_fare', {
      type: require('sequelize').DataTypes.FLOAT,
      defaultValue: 0,
    }).catch(err => console.log('max_fare column might already exist:', err.message));

    console.log('Adding tax_percentage column...');
    await queryInterface.addColumn('Routes', 'tax_percentage', {
      type: require('sequelize').DataTypes.FLOAT,
      defaultValue: 0,
    }).catch(err => console.log('tax_percentage column might already exist:', err.message));

    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Unable to connect to the database or apply migration:', error);
  } finally {
    await sequelize.close();
  }
}

addPricingColumnsToRoutes();
