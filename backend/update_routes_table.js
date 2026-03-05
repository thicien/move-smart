const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
});

async function run() {
  try {
    console.log("Starting DB migration for Routes...");
    
    // Make company_id nullable
    await sequelize.query("ALTER TABLE Routes MODIFY COLUMN company_id INT NULL");
    console.log("Modified company_id to allow NULL");

    // Add code column
    try {
        await sequelize.query("ALTER TABLE Routes ADD COLUMN code VARCHAR(255) NOT NULL UNIQUE AFTER company_id");
        console.log("Added code column");
    } catch (e) {
        if (e.message.includes('Duplicate column name')) {
            console.log("code column already exists");
        } else {
            throw e;
        }
    }

    // Add name column
    try {
        await sequelize.query("ALTER TABLE Routes ADD COLUMN name VARCHAR(255) NOT NULL AFTER code");
        console.log("Added name column");
    } catch (e) {
        if (e.message.includes('Duplicate column name')) {
            console.log("name column already exists");
        } else {
            throw e;
        }
    }

    // Add status column
    try {
        await sequelize.query("ALTER TABLE Routes ADD COLUMN status ENUM('Active', 'Suspended') DEFAULT 'Active' AFTER distance");
        console.log("Added status column");
    } catch (e) {
        if (e.message.includes('Duplicate column name')) {
            console.log("status column already exists");
        } else {
            throw e;
        }
    }

    console.log("Migration SUCCESS");
  } catch (e) {
    console.error("Migration failed:", e);
  } finally {
    process.exit();
  }
}

run();
