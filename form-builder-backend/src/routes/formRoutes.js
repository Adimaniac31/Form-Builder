"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formController_1 = require("../controllers/formController"); // Correct imports
const router = (0, express_1.Router)();
// Define routes
router.post("/forms", formController_1.createForm);
// Route for getting form by its unique shareable link
router.get("/form/:link", (req, res, next) => {
    // Wrap the asynchronous handler in a middleware function
    (0, formController_1.getFormByLink)(req, res).catch(next);
});
exports.default = router;
