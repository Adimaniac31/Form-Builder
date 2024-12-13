"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const submissionController_1 = require("../controllers/submissionController");
const router = express_1.default.Router();
/**
 * @swagger
 * /api/sub/{formId}/submit:
 *   post:
 *     summary: Submit a form
 *     description: Submits the form data to be saved.
 *     tags:
 *       - Submissions
 *     parameters:
 *       - name: formId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the form.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               submissionData:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *     responses:
 *       201:
 *         description: Submission saved successfully.
 *       400:
 *         description: Invalid form data.
 *       500:
 *         description: Server error.
 */
router.post("/:formId/submit", (req, res, next) => {
    (0, submissionController_1.saveSubmission)(req, res).catch(next);
});
/**
 * @swagger
 * /api/sub/{formId}/submissions:
 *   get:
 *     summary: Get all submissions for a form
 *     description: Retrieves all submissions for a specific form.
 *     tags:
 *       - Submissions
 *     parameters:
 *       - name: formId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the form.
 *     responses:
 *       200:
 *         description: Submissions found.
 *       404:
 *         description: No submissions found for this form.
 *       500:
 *         description: Server error.
 */
router.get("/:formId/submissions", (req, res, next) => {
    (0, submissionController_1.getSubmissions)(req, res).catch(next);
});
/**
 * @swagger
 * /api/sub/{formId}/export:
 *   get:
 *     summary: Export form submissions as CSV
 *     description: Exports all submissions for a form to a CSV file.
 *     tags:
 *       - Submissions
 *     parameters:
 *       - name: formId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the form.
 *     responses:
 *       200:
 *         description: CSV file downloaded.
 *       500:
 *         description: Error exporting submissions.
 */
router.get("/:formId/export", (req, res, next) => {
    (0, submissionController_1.exportSubmissions)(req, res).catch(next);
});
/**
 * @swagger
 * /api/sub/{formId}/stats:
 *   get:
 *     summary: Get submission stats for a form
 *     description: Retrieves total and recent submission stats for a form.
 *     tags:
 *       - Submissions
 *     parameters:
 *       - name: formId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the form.
 *     responses:
 *       200:
 *         description: Submission stats found.
 *       500:
 *         description: Error fetching stats.
 */
router.get("/:formId/stats", (req, res, next) => {
    (0, submissionController_1.getSubmissionStats)(req, res).catch(next);
});
exports.default = router;
