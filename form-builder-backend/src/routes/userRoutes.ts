import express from "express";
import { signup, signin } from "../controllers/userController";

const router = express.Router();

// Signup Route
router.post("/signup", (req, res, next) => {
  signup(req, res).catch(next);
});

// Signin Route
router.post("/signin", (req, res, next) => {
  signin(req, res).catch(next);
});

export default router;

