"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const submissionController_1 = require("../controllers/submissionController");
const router = express_1.default.Router();
// Save a form submission
router.post("/:formId/submit", (req, res, next) => {
    (0, submissionController_1.saveSubmission)(req, res).catch(next);
});
// Get all submissions for a form
router.get("/:formId/submissions", (req, res, next) => {
    (0, submissionController_1.getSubmissions)(req, res).catch(next);
});
// Export submissions as CSV
router.get("/:formId/export", (req, res, next) => {
    (0, submissionController_1.exportSubmissions)(req, res).catch(next);
});
// Get submission stats
router.get("/:formId/stats", (req, res, next) => {
    (0, submissionController_1.getSubmissionStats)(req, res).catch(next);
});
exports.default = router;
