import { Request, Response } from "express";
import { User } from "../models/User";

export const signup = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const newUser = await User.create({ username });
    return res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Signup failed." });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });
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
  } catch (error) {
    console.error("Error during signin:", error);
    return res.status(500).json({ message: "Signin failed." });
  }
};
