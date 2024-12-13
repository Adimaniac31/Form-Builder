import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import formRoutes from "./routes/formRoutes"; // Import form routes
import submissionRoutes from "./routes/submissionRoutes"; // Import submission routes
import userRoutes from "./routes/userRoutes"; // Import user routes

const app = express();
const port = process.env.PORT;

// CORS Setup
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Set up Swagger options
const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Form Builder API",
      version: "1.0.0",
      description: "API documentation for the Form Builder application",
    },
    servers: [
      {
        url: "http://localhost:5000", // Update with actual server URL
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the routes files that contain Swagger annotations
};

// Initialize Swagger JSDoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI on /api-docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Set up routes
app.use("/api", formRoutes); // Form routes
app.use("/api/sub", submissionRoutes); // Submission routes
app.use("/api/user", userRoutes); // User routes

export default app;

