import { Request, Response } from "express";
import { Form } from "../models/Form";
import { User } from "../models/User";
import { Submission } from "../models/Submission";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

export const createForm = async (req: Request, res: Response) => {
  const { userId, title, description, fields } = req.body;

  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a unique shareable link
    const shareableLink = `${process.env.BASE_URL || "http://localhost:5173"}/form/${uuidv4()}`;

    // Create the form
    const form = await Form.create({
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
  } catch (error) {
    console.error("Error creating form:", error);
    return res.status(500).json({ message: "Error creating form." });
  }
};


// Get all forms for a user
export const getForms = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({ message: "UserId is required." });
    }

    // Fetch all forms created by the user
    const forms = await Form.findAll({ where: { userId } });

    // For each form, fetch the submission count
    const formsWithSubmissionCounts = await Promise.all(
      forms.map(async (form) => {
        const submissionCount = await Submission.count({ where: { formId: form.id } });
        return {
          ...form.toJSON(),
          submissionCount,
        };
      })
    );

    return res.status(200).json({ forms: formsWithSubmissionCounts });
  } catch (error) {
    console.error("Error fetching forms:", error);
    return res.status(500).json({ message: "Error fetching forms." });
  }
};


// Edit an existing form
export const editForm = async (req: Request, res: Response) => {
  const { formId } = req.params;
  const { title, description, fields } = req.body;

  try {
    // Validate input
    if (!title && !description && !fields) {
      return res.status(400).json({ message: "No fields to update." });
    }

    // Fetch the form for the given formId and userId
    const form = await Form.findOne({ where: { id: formId} });
    if (!form) {
      return res.status(404).json({ message: "Form not found or unauthorized." });
    }

    // Update the form details
    if (title) form.title = title;
    if (description) form.description = description;
    if (fields) {
      if (!Array.isArray(fields)) {
        return res.status(400).json({ message: "Fields must be an array." });
      }
      form.fields = fields;
    }

    // Save the updated form
    await form.save();

    return res.status(200).json({ message: "Form updated successfully.", form });
  } catch (error) {
    let errorMessage = "An unexpected error occurred.";

    // Narrow down the error type
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error editing form:", errorMessage);
    return res.status(500).json({ message: "Error editing form.", error: errorMessage });
  }
};



// Delete a form
// deleteForm.ts (Controller)
export const deleteForm = async (req: Request, res: Response) => {
  const { formId } = req.params;
  const { userId } = req.body;

  try {
    // Find the form by formId and userId to check ownership
    const form = await Form.findOne({ where: { id: formId, userId } });
    if (!form) {
      return res.status(404).json({ message: "Form not found or unauthorized." });
    }

    // Delete related submissions first
    await Submission.destroy({ where: { formId } });

    // Delete the form
    await form.destroy();
    return res.status(200).json({ message: "Form and related submissions deleted successfully." });
  } catch (error) {
    console.error("Error deleting form:", error);
    return res.status(500).json({ message: "Error deleting form." });
  }
};



// Fetch form details by its unique link (UUID)
export const getFormByLink = async (req: Request, res: Response) => {
  try {
    const { link } = req.params;  // Extract the UUID from the URL

    // Look for the form using only the UUID
    const form = await Form.findOne({ where: { shareableLink: { [Op.like]: `%${link}%` } } });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Return the form details
    return res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    return res.status(500).json({ error: "Failed to fetch form" });
  }
};

// getFormByFormId.ts (Controller)
export const getFormByFormId = async (req: Request, res: Response) => {
  const { formId } = req.params;

  try {
    // Find the form by formId
    const form = await Form.findByPk(formId);

    if (!form) {
      return res.status(404).json({ message: "Form not found." });
    }

    // Return the form data (with its fields and other details)
    return res.status(200).json({ form });
  } catch (error) {
    console.error("Error fetching form by formId:", error);
    return res.status(500).json({ message: "Error fetching form." });
  }
};

