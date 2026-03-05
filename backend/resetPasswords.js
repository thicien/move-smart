const { User, sequelize } = require('./src/models');

async function resetPasswords() {
  try {
    await sequelize.authenticate();
    console.log('Connected to database.');
    
    // Update all users' hashed passwords to a default plaintext password
    await User.update({ password: 'password123' }, { where: {} });
    
    console.log('Successfully reset all user passwords to "password123".');
    console.log('Note: bcrypt hashes cannot be reversed, so existing passwords were reset.');
  } catch (error) {
    console.error('Error resetting passwords:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

resetPasswords();
