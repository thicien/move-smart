const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
});

async function run() {
  try {
    await sequelize.query("ALTER TABLE Users MODIFY COLUMN role ENUM('passenger', 'agent', 'company_admin', 'government', 'system_admin') DEFAULT 'passenger'");
    await sequelize.query("UPDATE Users SET role = 'government' WHERE email = 'admin@gov.rw'");
    console.log("SUCCESS");
  } catch (e) {
    console.error(e);
  } finally {
    process.exit();
  }
}
run();
