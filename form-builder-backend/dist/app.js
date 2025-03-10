"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const formRoutes_1 = __importDefault(require("./routes/formRoutes")); // Import the routes
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Set up form-related routes
app.use("/api", formRoutes_1.default);
exports.default = app;
