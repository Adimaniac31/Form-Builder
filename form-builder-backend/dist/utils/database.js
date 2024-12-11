"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Form_1 = require("../models/Form");
const Submission_1 = require("../models/Submission");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    dialect: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    models: [Form_1.Form, Submission_1.Submission],
});
exports.default = sequelize;
