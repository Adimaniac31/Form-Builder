"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formController_1 = require("../controllers/formController");
const router = (0, express_1.Router)();
// Route to get all forms created by the user
router.get("/forms", (req, res, next) => {
    (0, formController_1.getForms)(req, res).catch(next);
});
// Route to create a new form
router.post("/create-form", (req, res, next) => {
    (0, formController_1.createForm)(req, res).catch(next);
});
// Route to edit an existing form
router.put("/edit-form/:formId", (req, res, next) => {
    (0, formController_1.editForm)(req, res).catch(next);
});
// Route to delete a form
router.delete("/delete-form/:formId", (req, res, next) => {
    (0, formController_1.deleteForm)(req, res).catch(next);
});
// Route for fetching a form by its unique shareable link
router.get("/form/:link", (req, res, next) => {
    (0, formController_1.getFormByLink)(req, res).catch(next);
});
router.get("/findForm/:formId", (req, res, next) => {
    (0, formController_1.getFormByFormId)(req, res).catch(next);
});
exports.default = router;
