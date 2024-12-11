import { Router } from "express";
import { submitForm, getSubmissions } from "../controllers/submissionController";

const router = Router();

router.post("/submissions", submitForm);
router.get("/submissions/:formId", getSubmissions);

export default router;
