const { Bus, Booking, User } = require('../models');

// Update Bus Location
exports.updateLocation = async (req, res) => {
  try {
    const { bus_id } = req.params;
    const { lat, lng } = req.body;

    const bus = await Bus.findByPk(bus_id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    bus.current_lat = lat;
    bus.current_lng = lng;
    await bus.save();

    res.json({ message: 'Location updated successfully', bus });
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
