import express from "express";
import { signup, signin } from "../controllers/userController";

const router = express.Router();

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: User Signup
 *     description: Creates a new user with a unique username.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Username already exists.
 *       500:
 *         description: Server error.
 */
router.post("/signup", (req,res,next) => {
  signup(req,res).catch(next);
});

/**
 * @swagger
 * /api/user/signin:
 *   post:
 *     summary: User Signin
 *     description: Authenticates an existing user by their username.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *     responses:
 *       200:
 *         description: Signin successful.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
router.post("/signin", (req,res,next) => {
  signin(req,res).catch(next);
});

export default router;


