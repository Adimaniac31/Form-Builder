import { Request, Response } from "express";
import { Submission } from "../models/Submission";

export const submitForm = async (req: Request, res: Response) => {
  try {
    const { formId, data } = req.body;
    const submission = await Submission.create({ formId, data });
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit form" });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const submissions = await Submission.findAll({ where: { formId } });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};
