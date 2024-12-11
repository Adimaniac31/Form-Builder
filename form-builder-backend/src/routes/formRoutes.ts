import { Router } from "express";
import { createForm, getFormByLink } from "../controllers/formController"; // Correct imports

const router = Router();

// Define routes
router.post("/forms", createForm);

// Route for getting form by its unique shareable link
router.get("/form/:link", (req, res, next) => {
  // Wrap the asynchronous handler in a middleware function
  getFormByLink(req, res).catch(next);
});

export default router;


