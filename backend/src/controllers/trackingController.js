const { Bus, Booking, User, Route, Alert } = require('../models');

// Helper for Haversine distance in km
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;  
  const dLon = (lon2 - lon1) * Math.PI / 180; 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; 
}

// Update Bus Location
exports.updateLocation = async (req, res) => {
  try {
    const { bus_id } = req.params;
    const { lat, lng } = req.body;

    const bus = await Bus.findByPk(bus_id, {
      include: [{ model: Route }]
    });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    bus.current_lat = lat;
    bus.current_lng = lng;
    await bus.save();

    let offRoute = false;
    let minDistance = Infinity;

    // Validate Master Route Geofencing
    if (bus.Route && bus.Route.path_geometry && bus.Route.path_geometry.length > 0) {
      for (const point of bus.Route.path_geometry) {
        const d = getDistanceFromLatLonInKm(lat, lng, point.lat, point.lng);
        if (d < minDistance) minDistance = d;
      }
      
      // If distance > 500 meters (0.5 km) -> Off-Route Violation
      if (minDistance > 0.5) {
        offRoute = true;
        
        // Check for existing active alert for this bus so we don't spam
        const existingAlert = await Alert.findOne({
          where: { bus_id: bus.id, type: 'Off-Route', status: 'active' }
        });

        if (!existingAlert) {
          await Alert.create({
            company_id: bus.company_id,
            bus_id: bus.id,
            type: 'Off-Route',
            severity: 'High',
            status: 'active',
            description: `Bus ${bus.license_plate} deviated from its approved master route ${bus.Route.code} by ${(minDistance).toFixed(2)} km.`
          });
        }
      }
    }

    res.json({ message: 'Location updated successfully', bus, offRoute, minDistance: minDistance !== Infinity ? minDistance : null });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Bus Location
exports.getLocation = async (req, res) => {
  try {
    const { bus_id } = req.params;
    const bus = await Bus.findByPk(bus_id, {
      attributes: ['id', 'license_plate', 'current_lat', 'current_lng', 'status']
    });

    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mock Notification Endpoint
exports.sendNotification = async (req, res) => {
  try {
    const { user_id, message, type } = req.body;
    
    // In a real application, here we would integrate with SMS Gateway (e.g. Twilio) or Push Notifications (e.g. Firebase)
    console.log(`[NOTIFICATION - ${type}] To User ${user_id}: ${message}`);

    res.json({ message: 'Notification sent (mock via console)', payload: { user_id, message, type } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
