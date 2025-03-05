// // server/config/database.js
const Sequelize = require("sequelize");

require("dotenv").config(); // Load environment variables

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost", // Default to localhost if not set in .env
    dialect: "mysql",
    logging:  false, // Set to false to disable logging
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// console.log("Sequelize instance:", sequelize);
module.exports = sequelize;
