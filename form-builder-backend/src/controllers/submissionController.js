"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubmissions = exports.submitForm = void 0;
const Submission_1 = require("../models/Submission");
const submitForm = async (req, res) => {
    try {
        const { formId, data } = req.body;
        const submission = await Submission_1.Submission.create({ formId, data });
        res.status(201).json(submission);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to submit form" });
    }
};
exports.submitForm = submitForm;
const getSubmissions = async (req, res) => {
    try {
        const { formId } = req.params;
        const submissions = await Submission_1.Submission.findAll({ where: { formId } });
        res.status(200).json(submissions);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
};
exports.getSubmissions = getSubmissions;
