const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { userModel, todoModel } = require("./db");

const app = express();
const PORT = 3000;
app.use(express.json());

mongoose.connect(
  "mongodb+srv://himanshumishra3198:universe0@cluster0.lapri.mongodb.net/todo-app"
);

app.get("/", (req, res) => {
  res.send("<H1> Welcome to the todo app </H1>");
});

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    await userModel.create({
      email,
      password,
    });
    res.status(201).json({ message: "Signup Successful" });
  } catch (e) {
    res.status(403).json({
      message: e,
    });
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userModel.findOne({
    username: username,
    password: password,
  });

  if (user) {
    const token = jwt.sign(user._id, JWT_SECRET);
    res.status(200).json({
      token: token,
    });
  } else {
    res.status(401).json({
      message: "email or password is incorrect",
    });
  }
});

app.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`);
});
