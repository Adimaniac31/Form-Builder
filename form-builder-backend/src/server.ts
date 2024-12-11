import app from "./app"; // Import the Express app
import sequelize, { checkAndCreateDatabase } from "./utils/database"; // Import the database functions

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Check and create the database if it doesn't exist
    await checkAndCreateDatabase();

    // Sync models (create tables if not exists)
    await sequelize.sync({ alter: true }); // Alter will update the schema if there are changes

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit if the server fails to start
  }
};

// Start the server
startServer();

