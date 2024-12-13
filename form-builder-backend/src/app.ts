import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import formRoutes from "./routes/formRoutes"; // Import the routes
import submissionRoutes from "./routes/submissionRoutes";
import userRoutes from "./routes/userRoutes";
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Set up form-related routes
app.use("/api", formRoutes);
app.use("/api/sub",submissionRoutes);
app.use("/api/user",userRoutes);

export default app;

