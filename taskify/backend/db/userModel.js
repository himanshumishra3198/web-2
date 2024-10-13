const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const objectId = Schema.objectId;

const userShema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("users", userShema);

module.exports = {
  userModel,
};