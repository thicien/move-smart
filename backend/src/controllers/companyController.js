const { Company, Bus, Route, Schedule } = require('../models');

// --- COMPANY ENDPOINTS ---
exports.registerCompany = async (req, res) => {
  try {
    const { name, registration_number } = req.body;
    const admin_id = req.user.id; // from auth middleware

    const existingCompany = await Company.findOne({ where: { registration_number } });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already registered' });
    }

    const company = await Company.create({
      name,
      registration_number,
      admin_id
    });

    res.status(201).json({ message: 'Company registered successfully', company });
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// --- BUS ENDPOINTS ---
exports.addBus = async (req, res) => {
  try {
    const { company_id, license_plate, capacity, route_id, seat_price } = req.body;
    
    // Process image file if uploaded
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/buses/${req.file.filename}`;
    }

    // Validate seat price against route max_fare if route_id is provided
    if (route_id && seat_price) {
      const route = await Route.findByPk(route_id);
      if (route && route.max_fare > 0 && parseFloat(seat_price) > route.max_fare) {
        return res.status(400).json({ 
          message: `Price too high! The government has set a maximum legal fare of ${route.max_fare} RWF for this route.` 
        });
      }
    }

    const bus = await Bus.create({
      company_id,
      license_plate,
      capacity,
      status: 'active',
      route_id: route_id || null,
      seat_price: seat_price || null,
      image_url: image_url
    });
    
    // Fetch with associated route details
    const newBus = await Bus.findByPk(bus.id, {
      include: [{ model: Route, attributes: ['name', 'code'] }]
    });

    res.status(201).json({ message: 'Bus added', bus: newBus });
  } catch (error) {
    console.error('Add bus error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const { license_plate, capacity, route_id, seat_price, status } = req.body;
    
    const bus = await Bus.findByPk(id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    // Validate seat price against route max_fare if route_id is provided
    if (route_id && seat_price) {
      const route = await Route.findByPk(route_id);
      if (route && route.max_fare > 0 && parseFloat(seat_price) > route.max_fare) {
         return res.status(400).json({ 
          message: `Price too high! The government has set a maximum legal fare of ${route.max_fare} RWF for this route.` 
        });
      }
    }

    let image_url = bus.image_url;
    if (req.file) {
      image_url = `/uploads/buses/${req.file.filename}`;
    }

    await bus.update({
      license_plate,
      capacity,
      route_id: route_id || null,
      seat_price: seat_price || null,
      status,
      image_url
    });

    const updatedBus = await Bus.findByPk(id, {
      include: [{ model: Route, attributes: ['name', 'code'] }]
    });

    res.json({ message: 'Bus updated successfully', bus: updatedBus });
  } catch (error) {
    console.error('Update bus error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await Bus.findByPk(id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    await bus.destroy();
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error('Delete bus error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCompanyBuses = async (req, res) => {
  try {
    const { company_id } = req.params;
    const buses = await Bus.findAll({ 
      where: { company_id },
      include: [{ model: Route, attributes: ['name', 'code'] }]
    });
    res.json(buses);
  } catch (error) {
    console.error('Get buses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --- ROUTE ENDPOINTS ---
exports.addRoute = async (req, res) => {
  try {
    const { company_id, origin, destination, distance, estimated_duration } = req.body;

    const route = await Route.create({
      company_id,
      origin,
      destination,
      distance,
      estimated_duration
    });
    res.status(201).json({ message: 'Route added', route });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCompanyRoutes = async (req, res) => {
  try {
    const { company_id } = req.params;
    const routes = await Route.findAll({ where: { company_id } });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// --- SCHEDULE ENDPOINTS ---
exports.addSchedule = async (req, res) => {
  try {
    const { bus_id, route_id, departure_time, arrival_time, price, available_seats } = req.body;

    const schedule = await Schedule.create({
      bus_id,
      route_id,
      departure_time,
      arrival_time,
      price,
      available_seats
    });
    res.status(201).json({ message: 'Schedule added', schedule });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    // A more complex query could filter by route and date.
    // Simplifying here to just return all schedules with associated routes.
    const schedules = await Schedule.findAll({
      include: [
        { model: Bus, attributes: ['license_plate', 'capacity'] },
        { model: Route, attributes: ['origin', 'destination'] }
      ]
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
