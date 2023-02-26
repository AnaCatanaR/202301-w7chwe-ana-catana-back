import { type NextFunction, type Request, type Response } from "express";
import User from "../../database/models/User.js";
import CustomError from "../CustomError/CustomError.js";
import { UserRegister } from "../types.js";
import bcrypt from "bcryptjs";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().exec();

    res.status(200).json({ users });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't find users"
    );

    next(customError);
  }
};

export const createUser = async (
  req: Request<{}, {}, UserRegister>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = req.file?.filename;

    await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      avatar,
    });

    const feedbackUserMessage = `You have created an account for ${name} .The username and password have been sent to the e-mail address ${email}.`;
    res.status(201).json(feedbackUserMessage);
  } catch (error) {
    const customError = new CustomError(
      error.message,
      500,
      "Sorry, unable to create an user."
    );
    next(customError);
  }
};
