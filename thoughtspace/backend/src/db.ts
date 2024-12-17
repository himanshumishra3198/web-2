import { Schema, model } from "mongoose";

const userShema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const userModel = model("User", userShema);

// const contentShema = new Schema({
//   type: "document" | "number",
// });
