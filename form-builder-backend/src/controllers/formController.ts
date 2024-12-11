import { Request, Response } from "express";
import { Form } from "../models/Form";
import { v4 as uuidv4 } from "uuid"; // Importing UUID
import {Op} from "sequelize";

// Create form and generate unique URL
export const createForm = async (req: Request, res: Response) => {
  try {
    const { title, description, fields } = req.body;
    
    // Generate a unique shareable link (using UUID)
    const shareableLink = `${process.env.BASE_URL}/form/${uuidv4()}`;

    const form = await Form.create({
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
  } catch (error) {
    res.status(500).json({ error: "Failed to create form" });
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




