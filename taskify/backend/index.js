require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./auth/auth");

const app = express();
const PORT = 3000;

app.use(express.json());
mongoose.connect(process.env.MONGO_URL);

app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
