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
    const { company_id, license_plate, capacity } = req.body;
    // (Ensure user is admin of this company in a real app, keeping it simple here)

    const bus = await Bus.create({
      company_id,
      license_plate,
      capacity,
      status: 'active'
    });
    res.status(201).json({ message: 'Bus added', bus });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCompanyBuses = async (req, res) => {
  try {
    const { company_id } = req.params;
    const buses = await Bus.findAll({ where: { company_id } });
    res.json(buses);
  } catch (error) {
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
