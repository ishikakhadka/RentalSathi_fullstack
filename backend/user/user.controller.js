import express from "express";
import UserTable from "./user.model.js";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import yup from "yup";
import {
  loginCredentialSchema,
  registerUserSchema,
} from "./user.validation.js";

//!points to remember
// check if user with provided email exists
// hash password, do not store plain password
router.post(
  "/user/register",
  async (req, res, next) => {
    try {
      const validatedData = await registerUserSchema.validate(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    //extra new user from req.body
    const newUser = req.body;

    //find user with email
    const user = await UserTable.findOne({ email: newUser.email });

    //if user,throw error
    if (user) {
      return res.status(409).send({ message: "User already exists..." });
    }

    //hash password
    //requirement:plain password, saltRound
    const plainPassword = newUser.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    //replace plain password ith hashed password
    newUser.password = hashedPassword;

    //create table
    await UserTable.create(newUser);

    return res.status(201).send({ message: "User registered succesfully" });
  }
);

router.post(
  "/user/login",
  async (req, res, next) => {
    try {
      const validatedData = await loginCredentialSchema.validate(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    //extract login credentials from req.body
    const loginCredentials = req.body;

    //find user with provided email
    const user = await UserTable.findOne({ email: loginCredentials.email });

    //if not user throw error
    if (!user) {
      return res.status(404).send({ message: "Invalid Credentials" });
    }

    //check for password match
    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid Credentials" });
    }
    //generate token
    //payload=> object inside token

    const payload = { email: user.email };
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "7d",
    });
    user.password = undefined;
    return res.status(200).send({
      message: "login successful",
      accessToken: token,
      userDetails: user,
    });
  }
);

export { router as userController };
