"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
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
router.post("/signup", (req, res, next) => {
    (0, userController_1.signup)(req, res).catch(next);
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
router.post("/signin", (req, res, next) => {
    (0, userController_1.signin)(req, res).catch(next);
});
exports.default = router;
