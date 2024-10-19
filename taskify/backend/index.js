require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { userRouter, auth } = require("./auth/auth");
const { taskRouter } = require("./routes/taskRoutes");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/public")));
mongoose.connect(process.env.MONGO_URL);

app.use(userRouter);

app.get("/dashboard", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../frontend/public/dash-board.html"));
});

app.use(auth);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
