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

taskRouter.delete("/tasks/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const deletedTask = await taskModel.deleteOne({ _id: req.params.id });
    if (deletedTask) {
      res.status(200).json({
        message: "task deleted successfully",
      });
    } else {
      throw new Error("Task does not exist");
    }
  } catch (e) {
    res.status(401).json({
      message: e.message,
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
    const id = req.body.id;
    const state = req.body.state;

    // Use findById to retrieve a single task document
    const task = await taskModel.findById(id);

    // Check if the task was found
    if (task) {
      task.state = state; // Update the state
      let updatedTask = await task.save(); // Save the updated task
      console.log("updated");
      res.status(200).json({ message: "State updated successfully" });
      return;
    } else {
      res.status(404).json({
        message: "Task not found",
      });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      // Changed status to 500 for server error
      message: e.message || "An error occurred", // Send a more user-friendly error message
    });
  }
});

module.exports = {
  taskRouter: taskRouter,
};
