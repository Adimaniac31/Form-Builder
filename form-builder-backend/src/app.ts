import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import formRoutes from "./routes/formRoutes"; // Import the routes

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Set up form-related routes
app.use("/api", formRoutes);

export default app;

