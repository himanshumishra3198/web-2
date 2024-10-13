const jwt = require("jsonwebtoken");
const { Router } = require("express");
const bcrypt = require("bcrypt");
const { userModel } = require("../db/userModel");
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 5);
  try {
    await userModel.create({
      email: email,
      password: password,
    });
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (e) {
    res.status(403).json({
      message: e,
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await userModel.findOne({
      email: email,
    });
    if (!user) {
      res.status(401).json({
        message: "User does not exist",
      });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    const JWT_SECRET = process.env.JWT_SECRET;

    if (match) {
      const token = await jwt.sign({ userId: user.userId }, JWT_SECRET);
      res.status(200).json({
        token: token,
      });
    } else {
      throw new Error("Email or Password is incorrect");
    }
  } catch (e) {
    res.status(401).json({
      message: e.message,
    });
  }
});

module.exports = {
  userRouter: userRouter,
};
