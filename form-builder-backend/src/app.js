"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const formRoutes_1 = __importDefault(require("./routes/formRoutes")); // Import form routes
const submissionRoutes_1 = __importDefault(require("./routes/submissionRoutes")); // Import submission routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Import user routes
const app = (0, express_1.default)();
const port = process.env.PORT;
// CORS Setup
app.use((0, cors_1.default)());
// Body Parser Middleware
app.use(body_parser_1.default.json());
// Set up Swagger options
const swaggerOptions = {
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Serve Swagger UI on /api-docs route
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Set up routes
app.use("/api", formRoutes_1.default); // Form routes
app.use("/api/sub", submissionRoutes_1.default); // Submission routes
app.use("/api/user", userRoutes_1.default); // User routes
exports.default = app;
