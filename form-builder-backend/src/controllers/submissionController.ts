import { Request, Response } from "express";
import { Form } from "../models/Form";
import { Submission } from "../models/Submission";

export const saveSubmission = async (req: Request, res: Response) => {
  const { formId } = req.params;
  const submissionData = req.body; // Expect raw JSON data

  try {
    // Verify the form exists
    const form = await Form.findByPk(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }

    // Save the submission
    const submission = await Submission.create({ formId, submissionData });

    return res.status(201).json({
      message: "Submission saved successfully.",
      submission,
    });
  } catch (error) {
    console.error("Error saving submission:", error);

    // Respond with detailed error message for debugging
    return res.status(500).json({
      message: "Error saving submission."
    });
  }
};


// Get all submissions for a form

// Assuming this is your existing getSubmissions controller
export const getSubmissions = async (req: Request, res: Response) => {
  const { formId } = req.params; // Extract formId from URL params

  try {
    // Fetch the form by formId to get the fields with their labels
    const form = await Form.findByPk(formId); // Using findByPk to search by the formId
    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }

    // Fetch all submissions for the form
    const submissions = await Submission.findAll({ where: { formId } });

    if (submissions.length === 0) {
      return res.status(404).json({ message: "No submissions found for this form." });
    }

    return res.status(200).json({ submissions: submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return res.status(500).json({ message: "Failed to fetch submissions." });
  }
};



// Export submissions as CSV
export const exportSubmissions = async (req: Request, res: Response) => {
  const { formId, userId } = req.query;

  try {
    const submissions = await Submission.findAll({
      where: { formId },
      include: [{ model: Form, where: { userId } }],
    });

    if (submissions.length === 0) {
      return res.status(404).json({ message: "No submissions found." });
    }

    // Convert submissions to CSV format
    const csvData = submissions
      .map((submission) => JSON.stringify(submission.submissionData))
      .join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=submissions.csv");
    res.status(200).send(csvData);
  } catch (error) {
    console.error("Error exporting submissions:", error);
    return res.status(500).json({ message: "Error exporting submissions." });
  }
};

export const getSubmissionStats = async (req: Request, res: Response) => {
  const { formId } = req.params; // Extract formId from the route
  const { userId } = req.query; // Extract userId from the query

  try {
    // Verify the form belongs to the user
    const form = await Form.findOne({ where: { id: formId, userId } });
    if (!form) {
      return res.status(404).json({ message: "Form not found or unauthorized." });
    }

    // Fetch submissions for the given formId
    const submissions = await Submission.findAll({ where: { formId } });
    const totalSubmissions = submissions.length;

    // Get recent submissions (last 5 submissions)
    const recentSubmissions = submissions
      .slice(-5)
      .map((submission) => ({
        id: submission.id,
        data: submission.submissionData,
        createdAt: submission.createdAt,
      }));

    // Respond with submission stats
    res.status(200).json({
      totalSubmissions,
      recentSubmissions,
    });
  } catch (error) {
    console.error("Error fetching submission stats:", error);
    res.status(500).json({ error: "Failed to fetch submission stats" });
  }
};

