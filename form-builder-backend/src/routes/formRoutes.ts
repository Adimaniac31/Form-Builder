import { Router } from "express";
import {
  createForm,
  getFormByLink,
  getForms,
  editForm,
  deleteForm,
  getFormByFormId,
} from "../controllers/formController";

const router = Router();

// Route to get all forms created by the user
router.get("/forms", (req, res, next) => {
  getForms(req, res).catch(next);
});

// Route to create a new form
router.post("/create-form", (req, res, next) => {
  createForm(req, res).catch(next);
});

// Route to edit an existing form
router.put("/edit-form/:formId", (req, res, next) => {
  editForm(req, res).catch(next);
});

// Route to delete a form
router.delete("/delete-form/:formId", (req, res, next) => {
  deleteForm(req, res).catch(next);
});

// Route for fetching a form by its unique shareable link
router.get("/form/:link", (req, res, next) => {
  getFormByLink(req, res).catch(next);
});

router.get("/findForm/:formId", (req, res, next) => {
  getFormByFormId(req, res).catch(next);
});


export default router;


