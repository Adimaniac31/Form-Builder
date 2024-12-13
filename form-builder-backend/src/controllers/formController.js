"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormByFormId = exports.getFormByLink = exports.deleteForm = exports.editForm = exports.getForms = exports.createForm = void 0;
const Form_1 = require("../models/Form");
const User_1 = require("../models/User");
const Submission_1 = require("../models/Submission");
const uuid_1 = require("uuid");
const sequelize_1 = require("sequelize");
const createForm = async (req, res) => {
    const { userId, title, description, fields } = req.body;
    try {
        // Check if the user exists
        const user = await User_1.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Generate a unique shareable link
        const shareableLink = `${process.env.BASE_URL || "http://localhost:5173"}/form/${(0, uuid_1.v4)()}`;
        // Create the form
        const form = await Form_1.Form.create({
            title,
            description,
            fields,
            userId,
            shareableLink,
        });
        return res.status(201).json({
            message: "Form created successfully.",
            form,
        });
    }
    catch (error) {
        console.error("Error creating form:", error);
        return res.status(500).json({ message: "Error creating form." });
    }
};
exports.createForm = createForm;
// Get all forms for a user
const getForms = async (req, res) => {
    const { userId } = req.query;
    try {
        if (!userId) {
            return res.status(400).json({ message: "UserId is required." });
        }
        // Fetch all forms created by the user
        const forms = await Form_1.Form.findAll({ where: { userId } });
        // For each form, fetch the submission count
        const formsWithSubmissionCounts = await Promise.all(forms.map(async (form) => {
            const submissionCount = await Submission_1.Submission.count({ where: { formId: form.id } });
            return {
                ...form.toJSON(),
                submissionCount,
            };
        }));
        return res.status(200).json({ forms: formsWithSubmissionCounts });
    }
    catch (error) {
        console.error("Error fetching forms:", error);
        return res.status(500).json({ message: "Error fetching forms." });
    }
};
exports.getForms = getForms;
// Edit an existing form
const editForm = async (req, res) => {
    const { formId } = req.params;
    const { title, description, fields } = req.body;
    try {
        // Validate input
        if (!title && !description && !fields) {
            return res.status(400).json({ message: "No fields to update." });
        }
        // Fetch the form for the given formId and userId
        const form = await Form_1.Form.findOne({ where: { id: formId } });
        if (!form) {
            return res.status(404).json({ message: "Form not found or unauthorized." });
        }
        // Update the form details
        if (title)
            form.title = title;
        if (description)
            form.description = description;
        if (fields) {
            if (!Array.isArray(fields)) {
                return res.status(400).json({ message: "Fields must be an array." });
            }
            form.fields = fields;
        }
        // Save the updated form
        await form.save();
        return res.status(200).json({ message: "Form updated successfully.", form });
    }
    catch (error) {
        let errorMessage = "An unexpected error occurred.";
        // Narrow down the error type
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("Error editing form:", errorMessage);
        return res.status(500).json({ message: "Error editing form.", error: errorMessage });
    }
};
exports.editForm = editForm;
// Delete a form
// deleteForm.ts (Controller)
const deleteForm = async (req, res) => {
    const { formId } = req.params;
    const { userId } = req.body;
    try {
        // Find the form by formId and userId to check ownership
        const form = await Form_1.Form.findOne({ where: { id: formId, userId } });
        if (!form) {
            return res.status(404).json({ message: "Form not found or unauthorized." });
        }
        // Delete related submissions first
        await Submission_1.Submission.destroy({ where: { formId } });
        // Delete the form
        await form.destroy();
        return res.status(200).json({ message: "Form and related submissions deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting form:", error);
        return res.status(500).json({ message: "Error deleting form." });
    }
};
exports.deleteForm = deleteForm;
// Fetch form details by its unique link (UUID)
const getFormByLink = async (req, res) => {
    try {
        const { link } = req.params; // Extract the UUID from the URL
        // Look for the form using only the UUID
        const form = await Form_1.Form.findOne({ where: { shareableLink: { [sequelize_1.Op.like]: `%${link}%` } } });
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }
        // Return the form details
        return res.status(200).json(form);
    }
    catch (error) {
        console.error("Error fetching form:", error);
        return res.status(500).json({ error: "Failed to fetch form" });
    }
};
exports.getFormByLink = getFormByLink;
// getFormByFormId.ts (Controller)
const getFormByFormId = async (req, res) => {
    const { formId } = req.params;
    try {
        // Find the form by formId
        const form = await Form_1.Form.findByPk(formId);
        if (!form) {
            return res.status(404).json({ message: "Form not found." });
        }
        // Return the form data (with its fields and other details)
        return res.status(200).json({ form });
    }
    catch (error) {
        console.error("Error fetching form by formId:", error);
        return res.status(500).json({ message: "Error fetching form." });
    }
};
exports.getFormByFormId = getFormByFormId;
