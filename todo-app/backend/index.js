const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { userModel, todoModel } = require("./db");

const app = express();
const PORT = 3000;
const JWT_SECRET = "Jai Bajrang Bali";

app.use(express.json());

mongoose.connect(
  "mongodb+srv://himanshumishra3198:universe0@cluster0.lapri.mongodb.net/todo-app"
);

app.get("/", (req, res) => {
  res.send("<H1> Welcome to the todo app </H1>");
});

app.post("/signup", async (req, res) => {
  const email = req.body.email;

  const password = await bcrypt.hash(req.body.password, 5);
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
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({
    email: email,
  });
  let match;
  if (user) {
    match = await bcrypt.compare(password, user.password);
  }
  if (match) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({
      token: token,
    });
  } else {
    res.status(401).json({
      message: "email or password is incorrect",
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.authorization;
  try {
    let payload = jwt.verify(token, JWT_SECRET);
    req.body.userId = payload.userId;
    next();
  } catch (e) {
    res.status(401).json({
      message: "You are unauthorized",
    });
  }
}
// auth middleware except signup and signin
app.use(auth);

app.post("/todo", async (req, res) => {
  try {
    await todoModel.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId,
    });
    res.status(201).json({
      message: "Todo saved Successfully",
    });
  } catch (e) {
    res.status(403).json({
      message: "Internal Server error",
    });
  }
});

app.put("/todo", async (req, res) => {
  try {
    let todo = await todoModel.findById({ _id: req.body.todoId });
    todo.title = req.body.title;
    todo.description = req.body.description;
    await todo.save();
    res.status(200).json({
      message: "todo updated successfully",
      todo,
    });
  } catch (e) {
    res.status(401).json({
      message: e,
    });
  }
});

app.get("/todos", async (req, res) => {
  try {
    let todos = await todoModel.find({
      userId: req.body.userId,
    });
    res.status(200).json(todos);
  } catch (e) {
    res.status(403).json({
      message: e,
    });
  }
});

app.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`);
});
