import express from "express";

const app = express();

app.post("/signup", (req, res) => {
  res.json({
    message: "signup was successful",
  });
});

app.post("/signin", (req, res) => {
  res.json({
    message: "signin was successful",
  });
});

app.post("/chat/:roomId", (req, res) => {
  console.log(req.params.roomId);
  res.json({
    message: "Entered chat room",
  });
});
