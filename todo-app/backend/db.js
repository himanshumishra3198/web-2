const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: String,
});

const todoSchema = new Schema({
  title: String,
  description: String,
  userId: ObjectId,
});
const userModel = mongoose.model("users", userSchema);
const todoModel = mongoose.model("todos", todoSchema);

module.exports = {
  userModel,
  todoModel,
};
