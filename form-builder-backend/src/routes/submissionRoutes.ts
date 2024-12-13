import express from "express";
import {
  saveSubmission,
  getSubmissions,
  exportSubmissions,
  getSubmissionStats,
} from "../controllers/submissionController";

const router = express.Router();

// Save a form submission
router.post("/:formId/submit", (req, res, next) => {
  saveSubmission(req, res).catch(next);
});

// Get all submissions for a form
router.get("/:formId/submissions", (req, res, next) => {
  getSubmissions(req, res).catch(next);
});

// Export submissions as CSV
router.get("/:formId/export", (req, res, next) => {
  exportSubmissions(req, res).catch(next);
});

// Get submission stats
router.get("/:formId/stats", (req, res, next) => {
  getSubmissionStats(req, res).catch(next);
});

export default router;

