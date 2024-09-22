const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

let users = [];
const JWT_SECRET = "JackDaniels";

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username,
    password,
  });
  res.status(201).send("User signed successfully!");
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    let token = jwt.sign(username, JWT_SECRET);
    user.token = token;
    res.status(200).send({
      token,
    });
  } else {
    res.status(401).send({
      message: "Incorrect username or password",
    });
  }
});

function auth(req, res, next) {
  const token = req.body.authorization;
  const username = jwt.verify(token, JWT_SECRET);

  if (username) {
    req.username = username;
    next();
  } else
    res.status(401).send({
      message: "You are not authorized to visit this site",
    });
}
app.get("/me", auth, (req, res) => {
  let user = users.find((user) => user.username === req.username);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(401).send({
      message: "Please provide a valid token",
    });
  }
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
