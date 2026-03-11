const { Route, Company, Booking, Payment, sequelize } = require('../models');

// --- GOVERNMENT / ADMIN ROUTE ENDPOINTS ---

exports.getDashboardStats = async (req, res) => {
  try {
    // Total Companies
    const totalCompanies = await Company.count();
    
    // Total Tickets Sold
    const totalTickets = await Booking.count();
    
    // Total System Revenue & Taxes
    const payments = await Payment.findAll({ where: { status: 'success' } });
    let totalRevenue = 0;
    let totalTaxes = 0;
    
    payments.forEach(p => {
      totalRevenue += parseFloat(p.amount) || 0;
      totalTaxes += parseFloat(p.tax_amount) || 0;
    });

    res.json({
      totalCompanies,
      totalTickets,
      totalRevenue,
      totalTaxes
    });
  } catch (error) {
    console.error('Admin dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createOfficialRoute = async (req, res) => {
  try {
    const { code, name, origin, destination, distance, estimated_duration, status } = req.body;

    const existingRoute = await Route.findOne({ where: { code } });
    if (existingRoute) {
      return res.status(400).json({ message: 'A route with this code already exists' });
    }

    const route = await Route.create({
      code,
      name,
      origin,
      destination,
      distance,
      estimated_duration,
      status: status || 'Active',
      company_id: null, // Official routes don't belong to a single company
    });

    res.status(201).json({ message: 'Official route created successfully', route });
  } catch (error) {
    console.error('Create official route error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOfficialRoutes = async (req, res) => {
  try {
    console.log("GET /api/admin/routes requested by user:", req.user?.id);
    const routes = await Route.findAll({
      where: {
        company_id: null
      }
    });
    console.log(`Found ${routes.length} official routes. Sending...`);
    res.json(routes);
  } catch (error) {
    console.error('Get official routes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateOfficialRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      code, name, origin, destination, distance, estimated_duration, status,
      base_fare, min_fare, max_fare, tax_percentage
    } = req.body;

    const route = await Route.findOne({ where: { id, company_id: null } });
    if (!route) {
      return res.status(404).json({ message: 'Official route not found' });
    }

    // Check if code is being changed to an existing code
    if (code && code !== route.code) {
      const existingRoute = await Route.findOne({ where: { code } });
      if (existingRoute) {
        return res.status(400).json({ message: 'A route with this code already exists' });
      }
    }

    await route.update({
      code,
      name,
      origin,
      destination,
      distance,
      estimated_duration,
      status,
      base_fare,
      min_fare,
      max_fare,
      tax_percentage
    });

    res.json({ message: 'Route updated successfully', route });
  } catch (error) {
    console.error('Update route error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteOfficialRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await Route.findOne({ where: { id, company_id: null } });
    
    if (!route) {
      return res.status(404).json({ message: 'Official route not found' });
    }

    await route.destroy();
    res.json({ message: 'Route deleted successfully' });
  } catch (error) {
    console.error('Delete route error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateRouteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['Active', 'Suspended'].includes(status)) {
       return res.status(400).json({ message: 'Invalid status' });
    }

    const route = await Route.findOne({ where: { id, company_id: null } });
    if (!route) {
      return res.status(404).json({ message: 'Official route not found' });
    }

    await route.update({ status });
    res.json({ message: `Route ${status.toLowerCase()} successfully`, route });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
