const { Company, Bus, Route, Schedule, Booking, Payment } = require('../models');

// --- COMPANY ENDPOINTS ---
exports.getDashboardStats = async (req, res) => {
  try {
    const { company_id } = req.params;
    
    // Find company logic
    const company = await Company.findOne({ where: { admin_id: company_id } });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Get all buses for this company
    const buses = await Bus.findAll({ where: { company_id: company.id } });
    const busIds = buses.map(b => b.id);

    // Get all schedules
    const schedules = await Schedule.findAll({ where: { bus_id: busIds } });
    const scheduleIds = schedules.map(s => s.id);

    // Get all bookings
    const bookings = await Booking.findAll({ where: { schedule_id: scheduleIds } });
    const totalTickets = bookings.length;

    // Get revenue from payments
    const bookingIds = bookings.map(b => b.id);
    const payments = await Payment.findAll({ where: { booking_id: bookingIds, status: 'success' } });
    
    let totalRevenue = 0;
    let totalTaxes = 0;
    
    payments.forEach(p => {
      totalRevenue += parseFloat(p.company_revenue) || 0;
      totalTaxes += parseFloat(p.tax_amount) || 0;
    });

    res.json({
      totalBuses: buses.length,
      totalSchedules: schedules.length,
      totalTickets,
      totalRevenue,
      totalTaxes
    });
  } catch (error) {
    console.error('Company dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

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
    const { company_id, license_plate, capacity, route_id, seat_price, driver_name, driver_phone } = req.body;
    
    // Find true company via admin_id which is passed from frontend user.id
    const company = await Company.findOne({ where: { admin_id: company_id } });
    if (!company) {
      return res.status(404).json({ message: 'Company not found for this user' });
    }

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
      company_id: company.id,
      license_plate,
      capacity,
      status: 'active',
      route_id: route_id || null,
      seat_price: seat_price || null,
      image_url: image_url,
      driver_name: driver_name || null,
      driver_phone: driver_phone || null
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
    const { license_plate, capacity, route_id, seat_price, status, driver_name, driver_phone } = req.body;
    
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
      image_url,
      driver_name: driver_name || null,
      driver_phone: driver_phone || null
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
    
    const company = await Company.findOne({ where: { admin_id: company_id } });
    if (!company) {
      return res.json([]);
    }

    const buses = await Bus.findAll({ 
      where: { company_id: company.id },
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
    const { bus_id, route_id, departure_time, arrival_time, price, available_seats, driver_name, driver_phone } = req.body;

    const schedule = await Schedule.create({
      bus_id,
      route_id,
      departure_time,
      arrival_time,
      price,
      available_seats,
      driver_name,
      driver_phone
    });
    res.status(201).json({ message: 'Schedule added', schedule });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const { company_id } = req.params;
    
    // Find true company via admin_id
    const company = await Company.findOne({ where: { admin_id: company_id } });
    if (!company) {
      return res.json([]);
    }

    // A schedule belongs to a Bus. Get all buses belonging to this company.
    const buses = await Bus.findAll({ where: { company_id: company.id }, attributes: ['id'] });
    const busIds = buses.map(b => b.id);

    // Now get schedules mapped to those bus IDs
    const schedules = await Schedule.findAll({
      where: { bus_id: busIds },
      include: [
        { model: Bus, attributes: ['id', 'license_plate', 'capacity', 'image_url'] },
        { model: Route, attributes: ['id', 'name', 'code', 'origin', 'destination', 'distance', 'estimated_duration'] }
      ]
    });
    res.json(schedules);
  } catch (error) {
    console.error('getSchedules error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { bus_id, route_id, departure_time, arrival_time, price, available_seats, driver_name, driver_phone } = req.body;
    
    const schedule = await Schedule.findByPk(id);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });

    await schedule.update({
      bus_id,
      route_id,
      departure_time,
      arrival_time,
      price,
      available_seats,
      driver_name,
      driver_phone
    });

    res.json({ message: 'Schedule updated successfully', schedule });
  } catch (error) {
    console.error('Update schedule error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByPk(id);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });

    await schedule.destroy();
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Delete schedule error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
