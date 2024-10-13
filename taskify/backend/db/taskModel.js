const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const objectId = Schema.objectId;

const taskShema = Schema({
  title: String,
  content: String,
  difficulty: String,
  state: String,
  date: String,
  time: String,
  userId: objectId,
});

const taskModel = mongoose.model("tasks", taskShema);

module.exports = {
  taskModel: taskModel,
};