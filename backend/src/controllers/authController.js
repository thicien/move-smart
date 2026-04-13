const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Company } = require('../models');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone, companyName, registrationNumber } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (role === 'company_admin' && (!companyName || !registrationNumber)) {
      return res.status(400).json({ message: 'Company name and registration number are required for company accounts' });
    }

    // Use plaintext password (as requested)
    const newUser = await User.create({
      name,
      email,
      password: password,
      role: role || 'passenger',
      phone
    });

    if (role === 'company_admin') {
      await Company.create({
        name: companyName,
        registration_number: registrationNumber,
        admin_id: newUser.id
      });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log('Login attempt:', { email, password });
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    email = email.trim().toLowerCase();
    password = password.trim();

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`Login failed: User not found with email ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password (plaintext comparison as requested)
    const isMatch = password === user.password;
    if (!isMatch) {
      console.log(`Login failed: Password mismatch for ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your_super_secret_jwt_key',
      { expiresIn: '365d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
