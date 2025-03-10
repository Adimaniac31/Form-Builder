"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormByLink = exports.createForm = void 0;
const Form_1 = require("../models/Form");
const uuid_1 = require("uuid"); // Importing UUID
// Create form and generate unique URL
const createForm = async (req, res) => {
    try {
        const { title, description, fields } = req.body;
        // Generate a unique shareable link (using UUID)
        const shareableLink = `${process.env.BASE_URL}/form/${(0, uuid_1.v4)()}`;
        const form = await Form_1.Form.create({
            title,
            description,
            fields,
            shareableLink,
        });
        res.status(201).json({
            message: "Form created successfully",
            form,
            shareableLink,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create form" });
    }
};
exports.createForm = createForm;
// Fetch form details by its unique ID (UUID)
const getFormByLink = async (req, res) => {
    try {
        const { link } = req.params;
        const form = await Form_1.Form.findOne({ where: { shareableLink: link } });
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json(form);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch form" });
    }
};
exports.getFormByLink = getFormByLink;
