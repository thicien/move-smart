const { Route } = require('../models');

// --- GOVERNMENT / ADMIN ROUTE ENDPOINTS ---

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
    // Optionally fetch only those where company_id is null, or all routes
    // We will show all routes that are official (company_id: null)
    const routes = await Route.findAll({
      where: {
        company_id: null
      }
    });
    res.json(routes);
  } catch (error) {
    console.error('Get official routes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
