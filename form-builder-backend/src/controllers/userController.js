"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const User_1 = require("../models/User");
const signup = async (req, res) => {
    const { username } = req.body;
    try {
        const existingUser = await User_1.User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }
        const newUser = await User_1.User.create({ username });
        return res.status(201).json({ message: "User created successfully.", user: newUser });
    }
    catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Signup failed." });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { username } = req.body;
    try {
        // Find user by username
        const user = await User_1.User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // Return username and user ID
        return res.status(200).json({
            message: "Signin successful.",
            user: {
                id: user.id,
                username: user.username,
            },
        });
    }
    catch (error) {
        console.error("Error during signin:", error);
        return res.status(500).json({ message: "Signin failed." });
    }
};
exports.signin = signin;
