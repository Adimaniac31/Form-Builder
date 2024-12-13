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

/**
 * @swagger
 * /api/forms:
 *   get:
 *     summary: Get all forms created by the user
 *     description: Fetches all the forms for the authenticated user
 *     tags:
 *       - Forms
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to fetch forms for.
 *     responses:
 *       200:
 *         description: A list of forms.
 *       400:
 *         description: User ID is required.
 *       500:
 *         description: Server error.
 */
router.get("/forms", (req,res,next) => {
  getForms(req,res).catch(next);
});

/**
 * @swagger
 * /api/create-form:
 *   post:
 *     summary: Create a new form
 *     description: Allows the user to create a new form with specified fields
 *     tags:
 *       - Forms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               fields:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: text
 *                     label:
 *                       type: string
 *                       example: "First Name"
 *     responses:
 *       201:
 *         description: Form created successfully.
 *       500:
 *         description: Server error.
 */
router.post("/create-form", (req,res,next) => {
  createForm(req,res).catch(next);
});

/**
 * @swagger
 * /api/edit-form/{formId}:
 *   put:
 *     summary: Edit an existing form
 *     description: Allows the user to edit an existing form's title, description, and fields.
 *     tags:
 *       - Forms
 *     parameters:
 *       - name: formId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the form to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               fields:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                     type:
 *                       type: string
 *     responses:
 *       200:
 *         description: Form updated successfully.
 *       400:
 *         description: Invalid request body.
 *       500:
 *         description: Server error.
 */
router.put("/edit-form/:formId", (req,res,next) => {
  editForm(req,res).catch(next);
});

/**
 * @swagger
 * /api/delete-form/{formId}:
 *   delete:
 *     summary: Delete a form
 *     description: Deletes the form and all related submissions.
 *     tags:
 *       - Forms
 *     parameters:
 *       - name: formId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the form to delete.
 *     responses:
 *       200:
 *         description: Form deleted successfully.
 *       500:
 *         description: Server error.
 */
router.delete("/delete-form/:formId", (req,res,next) => {
  deleteForm(req,res).catch(next);
});

/**
 * @swagger
 * /api/form/{link}:
 *   get:
 *     summary: Get a form by its shareable link
 *     description: Fetches the form details based on the unique shareable link.
 *     tags:
 *       - Forms
 *     parameters:
 *       - name: link
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The shareable link (UUID) of the form.
 *     responses:
 *       200:
 *         description: Form found.
 *       404:
 *         description: Form not found.
 */
router.get("/form/:link", (req,res,next) => {
  getFormByLink(req,res).catch(next);
});

/**
 * @swagger
 * /api/findForm/{formId}:
 *   get:
 *     summary: Get a form by its ID
 *     description: Fetches the form details based on the unique form ID.
 *     tags:
 *       - Forms
 *     parameters:
 *       - name: formId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the form.
 *     responses:
 *       200:
 *         description: Form found.
 *       404:
 *         description: Form not found.
 */
router.get("/findForm/:formId", (req,res,next) => {
  getFormByFormId(req,res).catch(next);
});

export default router;



