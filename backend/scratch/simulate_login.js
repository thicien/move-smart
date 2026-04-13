const { User } = require('../src/models');
const sequelize = require('../src/config/database');

async function simulate() {
  const testEmail = 'mugishathicien04@gmail.com';
  const testPass = 'password';

  try {
    console.log(`Simulating login for: ${testEmail} / ${testPass}`);
    const user = await User.findOne({ where: { email: testEmail } });
    if (!user) {
      console.log('FAIL: User not found in DB');
      return;
    }
    
    console.log(`Found User ID: ${user.id}`);
    console.log(`DB Password: "${user.password}" (len: ${user.password.length})`);
    
    const isMatch = testPass === user.password;
    console.log(`Comparison result: ${isMatch}`);

  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}
simulate();
