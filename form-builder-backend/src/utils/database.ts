import { Sequelize } from "sequelize-typescript";
import { Form } from "../models/Form"; // Import models
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const DB_NAME = process.env.DB_NAME || "form_builder"; // Use process.env values
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "password"; // Default if not set in .env
const DB_HOST = process.env.DB_HOST || "localhost";

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: "mysql", // Using MySQL
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME, // Set the database name here
  models: [Form], // Include models
  logging: false, // Optional: Disable Sequelize logging
});

// Function to check if the database exists, and if not, create it
const checkAndCreateDatabase = async () => {
  try {
    // Connect to MySQL without specifying the database name
    const tempSequelize = new Sequelize({
      dialect: "mysql",
      host: DB_HOST,
      username: DB_USER,
      password: DB_PASSWORD,
    });

    await tempSequelize.authenticate();
    console.log("Connection to MySQL has been established successfully.");

    // Check if the database exists
    const result = await tempSequelize.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${DB_NAME}'`
    );

    // If the database doesn't exist, create it
    if (result[0].length === 0) {
      console.log(`Database '${DB_NAME}' doesn't exist. Creating it...`);
      await tempSequelize.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`Database '${DB_NAME}' created successfully.`);
    }

    // Close the temporary connection after database check
    await tempSequelize.close();

    // Now, reconnect with the actual database
    await sequelize.authenticate(); // Connect with the proper database (after ensuring it exists)
    console.log(`Connected to the '${DB_NAME}' database.`);
  } catch (error) {
    console.error("Error checking or creating the database:", error);
    process.exit(1); // Exit if database creation fails
  }
};

export default sequelize;
export { checkAndCreateDatabase };



