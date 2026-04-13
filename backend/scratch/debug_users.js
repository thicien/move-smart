const { User } = require('../src/models');
const sequelize = require('../src/config/database');

async function debug() {
  try {
    await sequelize.authenticate();
    const users = await User.findAll();
    console.log('--- DATABASE USERS ---');
    users.forEach(u => {
      const passHex = Buffer.from(u.password).toString('hex');
      console.log(`ID: ${u.id} | Email: "${u.email}" (${u.email.length}) | Pass len: ${u.password.length} | Pass hex: ${passHex} | Role: "${u.role}"`);
    });
    console.log('-----------------------');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}
debug();
