const { Route, sequelize } = require('../models');

// Helpers for mock geometries
function generateMockRoute(originLat, originLng, destLat, destLng, steps = 10) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    points.push({
      lat: originLat + ((destLat - originLat) * (i / steps)),
      lng: originLng + ((destLng - originLng) * (i / steps)),
    });
  }
  return points;
}

const routesToSeed = [
  // 1. Major Intercity Routes
  { code: 'IC-001', name: 'Kigali - Musanze', origin: 'Nyabugogo', destination: 'Musanze', via: 'Shyorongi, Base', route_type: 'Intercity', base_fare: 1900 },
  { code: 'IC-002', name: 'Kigali - Rubavu', origin: 'Nyabugogo', destination: 'Rubavu (Gisenyi)', via: 'Musanze, Mukamira, Nyundo', route_type: 'Intercity', base_fare: 3100 },
  { code: 'IC-003', name: 'Kigali - Muhanga', origin: 'Nyabugogo', destination: 'Muhanga (Gitarama)', via: 'Kamonyi, Bishenyi', route_type: 'Intercity', base_fare: 1000 },
  { code: 'IC-004', name: 'Kigali - Huye', origin: 'Nyabugogo', destination: 'Huye (Butare)', via: 'Muhanga, Ruhango, Nyanza', route_type: 'Intercity', base_fare: 2800 },
  { code: 'IC-005', name: 'Kigali - Rusizi', origin: 'Nyabugogo', destination: 'Rusizi (Cyangugu)', via: 'Huye, Kitabi, Nyungwe', route_type: 'Intercity', base_fare: 6000 },
  { code: 'IC-006', name: 'Kigali - Karongi', origin: 'Nyabugogo', destination: 'Karongi (Kibuye)', via: 'Muhanga, Rubengera', route_type: 'Intercity', base_fare: 3500 },
  { code: 'IC-007', name: 'Kigali - Rwamagana', origin: 'Nyabugogo', destination: 'Rwamagana', via: 'Kabuga, Nyagasambu', route_type: 'Intercity', base_fare: 1100 },
  { code: 'IC-008', name: 'Kigali - Kayonza', origin: 'Nyabugogo', destination: 'Kayonza', via: 'Rwamagana', route_type: 'Intercity', base_fare: 1500 },
  { code: 'IC-009', name: 'Kigali - Nyagatare', origin: 'Nyabugogo', destination: 'Nyagatare', via: 'Kayonza, Kabarore', route_type: 'Intercity', base_fare: 3500 },
  { code: 'IC-010', name: 'Kigali - Kirehe', origin: 'Nyabugogo', destination: 'Kirehe (Rusumo)', via: 'Kayonza, Ngoma', route_type: 'Intercity', base_fare: 2500 },
  { code: 'IC-011', name: 'Kigali - Gicumbi', origin: 'Nyabugogo', destination: 'Gicumbi (Byumba)', via: 'Nyacyonga, Manyagiro', route_type: 'Intercity', base_fare: 1200 },
  { code: 'IC-012', name: 'Kigali - Gatuna', origin: 'Nyabugogo', destination: 'Gatuna', via: 'Gicumbi', route_type: 'Intercity', base_fare: 1700 },
  { code: 'IC-013', name: 'Kigali - Nyamata', origin: 'Nyabugogo', destination: 'Nyamata', via: 'Gahanga, Bugesera', route_type: 'Intercity', base_fare: 700 },
  { code: 'IC-014', name: 'Kigali - Ngororero', origin: 'Nyabugogo', destination: 'Ngororero', via: 'Muhanga, Gatumba', route_type: 'Intercity', base_fare: 1800 },
  { code: 'IC-015', name: 'Kigali - Kanyaru', origin: 'Nyabugogo', destination: 'Kanyaru', via: 'Huye', route_type: 'Intercity', base_fare: 3000 },

  // 2. Kigali Intracity Routes
  { code: 'URB-101', name: 'Nyabugogo - Downtown', origin: 'Nyabugogo', destination: 'Downtown (CBD)', via: 'Muhima', route_type: 'Intracity', base_fare: 250 },
  { code: 'URB-102', name: 'Nyabugogo - Kimironko', origin: 'Nyabugogo', destination: 'Kimironko', via: 'Gakinjiro, Kibagabaga', route_type: 'Intracity', base_fare: 300 },
  { code: 'URB-103', name: 'Nyabugogo - Remera', origin: 'Nyabugogo', destination: 'Remera', via: 'Kinamba, Kacyiru', route_type: 'Intracity', base_fare: 250 },
  { code: 'URB-104', name: 'Nyabugogo - Kanombe', origin: 'Nyabugogo', destination: 'Kanombe', via: 'Remera, Sonatube', route_type: 'Intracity', base_fare: 350 },
  { code: 'URB-105', name: 'Nyabugogo - Nyamirambo', origin: 'Nyabugogo', destination: 'Nyamirambo', via: 'Onatracom, Biryogo', route_type: 'Intracity', base_fare: 250 },
  { code: 'URB-106', name: 'Nyabugogo - Gisozi', origin: 'Nyabugogo', destination: 'Gisozi', via: 'ULK, Kagugu', route_type: 'Intracity', base_fare: 250 },
  { code: 'URB-107', name: 'Downtown - Kicukiro', origin: 'Downtown', destination: 'Kicukiro', via: 'Rwandex, Sonatube', route_type: 'Intracity', base_fare: 250 },
  { code: 'URB-108', name: 'Downtown - Gahanga', origin: 'Downtown', destination: 'Gahanga', via: 'Kicukiro, Rebero', route_type: 'Intracity', base_fare: 300 },
  { code: 'URB-109', name: 'Remera - Kabuga', origin: 'Remera', destination: 'Kabuga', via: 'Masaka, Mulindi', route_type: 'Intracity', base_fare: 300 },
  { code: 'URB-110', name: 'Remera - Kacyiru', origin: 'Remera', destination: 'Kacyiru', via: 'Chez Lando', route_type: 'Intracity', base_fare: 250 },
  { code: 'URB-111', name: 'Kimironko - Zindiro', origin: 'Kimironko', destination: 'Zindiro', via: 'Bumbogo', route_type: 'Intracity', base_fare: 250 },
  { code: 'URB-112', name: 'Nyamirambo - Rebero', origin: 'Nyamirambo', destination: 'Rebero', via: 'Kwa Mutwe', route_type: 'Intracity', base_fare: 250 },
  { code: 'URB-113', name: 'Downtown - Kanyinya', origin: 'Downtown', destination: 'Kanyinya', via: 'Nyabugogo, Shyorongi', route_type: 'Intracity', base_fare: 300 },
  { code: 'URB-114', name: 'Kacyiru - Kigali Heights', origin: 'Kacyiru', destination: 'Kigali Heights', via: 'Convention Centre', route_type: 'Intracity', base_fare: 250 },
  { code: 'URB-115', name: 'Kanombe - Airport', origin: 'Kanombe', destination: 'Airport', via: 'Military Hospital', route_type: 'Intracity', base_fare: 250 },

  // 3. Rural & Secondary Routes
  { code: 'SEC-201', name: 'Musanze - Rubavu', origin: 'Musanze', destination: 'Rubavu', via: 'Direct', route_type: 'Secondary', base_fare: 1500 },
  { code: 'SEC-202', name: 'Musanze - Cyanika', origin: 'Musanze', destination: 'Cyanika', via: 'Kinigi', route_type: 'Secondary', base_fare: 500 },
  { code: 'SEC-203', name: 'Huye - Nyamagabe', origin: 'Huye', destination: 'Nyamagabe', via: 'Kitabi', route_type: 'Secondary', base_fare: 800 },
  { code: 'SEC-204', name: 'Kayonza - Kagitumba', origin: 'Kayonza', destination: 'Kagitumba', via: 'Nyagatare', route_type: 'Secondary', base_fare: 2000 },
  { code: 'SEC-205', name: 'Ngoma - Rusumo', origin: 'Ngoma', destination: 'Rusumo', via: 'Kirehe', route_type: 'Secondary', base_fare: 1000 },
  { code: 'SEC-206', name: 'Muhanga - Ngororero', origin: 'Muhanga', destination: 'Ngororero', via: 'Gatumba', route_type: 'Secondary', base_fare: 1000 },
  { code: 'SEC-207', name: 'Ruhango - Karongi', origin: 'Ruhango', destination: 'Karongi', via: 'Bwakira', route_type: 'Secondary', base_fare: 2500 },
  { code: 'SEC-208', name: 'Nyamata - Nemba', origin: 'Nyamata', destination: 'Nemba', via: 'Ruhuha', route_type: 'Secondary', base_fare: 1000 },
  { code: 'SEC-209', name: 'Gicumbi - Nyagatare', origin: 'Gicumbi', destination: 'Nyagatare', via: 'Rukomo', route_type: 'Secondary', base_fare: 1500 },
  { code: 'SEC-210', name: 'Base - Butaro', origin: 'Base', destination: 'Butaro', via: 'Cancer Center', route_type: 'Secondary', base_fare: 800 },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');

    for (const route of routesToSeed) {
      // Create a default path geometry from random points near Kigali for tracking mock logic
      // Ideally this would be real GIS data
      const path_geometry = generateMockRoute(-1.9403, 30.0588, -1.9403 + Math.random()*0.1, 30.0588 + Math.random()*0.1);
      
      await Route.upsert({
        company_id: null, // Master Record
        code: route.code,
        name: route.name,
        origin: route.origin,
        destination: route.destination,
        via: route.via,
        route_type: route.route_type,
        base_fare: route.base_fare,
        path_geometry,
        status: 'Active'
      });
    }

    console.log('Seeded Master Routes Successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
