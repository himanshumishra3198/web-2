const { Router } = require("express");
const { taskModel } = require("../db/taskModel");
const mongoose = require("mongoose");

const taskRouter = Router();

taskRouter.post("/addTask", async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.body._id;
    const task = req.body.task;
    task.userId = userId;

    await taskModel.create(task);
    console.log("Saved");
    res.status(201).json({
      message: "Task added successfully",
    });
  } catch (e) {
    console.log("some error");
    console.log(e);
    res.status(403).json({
      message: e,
    });
  }
});

taskRouter.get("/getTask", async (req, res) => {
  try {
    const tasks = await taskModel.find({ userId: req.body._id });
    res.status(200).json({
      tasks: tasks,
    });
  } catch (e) {
    res.status(403).json({
      message: e,
    });
  }
});

taskRouter.put("/updateState", async (req, res) => {
  try {
    const task = req.body.task;
    const updatedTask = await taskModel.findByIdAndUpdate(task._id, task);
    console.log(updatedTask);
  } catch (e) {
    res.status(401).json({
      message: e,
    });
  }
});

module.exports = {
  taskRouter: taskRouter,
};
