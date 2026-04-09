const { Route, sequelize } = require('./src/models');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');

    await Route.upsert({
      company_id: null, // Master Record
      code: 'IC-001',
      name: 'Kigali - Musanze',
      origin: 'Nyabugogo',
      destination: 'Musanze',
      via: 'Shyorongi, Base',
      route_type: 'Intercity',
      base_fare: 1900,
      path_geometry: [{lat: 1.0, lng: 2.0}],
      status: 'Active'
    });
    console.log('Done');
    process.exit(0);
  } catch (error) {
    require('fs').writeFileSync('debug.txt', error.stack, 'utf8');
    console.log('Error written to debug.txt');
    process.exit(1);
  }
}
seed();
