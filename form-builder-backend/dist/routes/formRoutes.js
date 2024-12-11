"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formController_1 = require("../controllers/formController"); // Importing controller functions
const router = (0, express_1.Router)();
// Route to create a new form
router.post("/forms", formController_1.createForm);
// Route to get the form by its unique link
router.get("/form/:link", formController_1.getFormByLink);
exports.default = router;
