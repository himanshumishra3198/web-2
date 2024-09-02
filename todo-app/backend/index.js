const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
/* todo object
    {
        id:
        title:
        description:
    }
*/
let todos = [];
fs.readFile("todo.txt", "utf-8", (err, data) => {
  todos = JSON.parse(data);
});

app.get("/", (req, res) => {
  res.send(todos);
});

app.post("/", (req, res) => {
  todos.push({
    id: todos.length,
    title: req.body.title,
    description: req.body.description,
  });
  fs.writeFile("todo.txt", JSON.stringify(todos), (err) => {
    res.status(404).send(err);
  });
  res.status(201).send("data saved");
});

app.delete("/:id", (req, res) => {
  todos = todos.filter((task) => task.id != req.params.id);
  fs.writeFile("todo.txt", JSON.stringify(todos), (err) => {
    if (err) {
      res.status(404).send(err);
    }
  });
  res.status(200).send("task deleted");
});

app.listen(3000);
