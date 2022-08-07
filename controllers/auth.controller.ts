import bcrypt from "bcryptjs";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ email: req.body!.email });

    if (!user) return res.status(401).json({ status: "wrong email" });

    const validPass = await bcrypt.compare(req.body!.password, user.password!);

    if (!validPass) return res.status(401).json({ status: "wrong pass" });
    const token = jwt.sign(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.firstName,
      },
      "zegzrg",
      { expiresIn: "2d" }
    );

    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    // check if the user exists
    const UserExist = await userModel.findOne({ email: req.body!.email });

    if (UserExist)
      return res.status(500).json({ status: "User Already exist" });

    // Generating the salt
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body!.password, salt);

    const newUser = new userModel({
      firstName: req.body!.firstName,
      lastName: req.body!.lastName,
      email: req.body!.email,
      password: hashedPassword,
      avatar: req.body!.avatar,
    });
    const savedUser = await newUser.save();

    return res.status(200).json(savedUser);
  } catch (error: any) {
    return res.status(500).json(error);
  }
};
