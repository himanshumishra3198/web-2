import { Schema, model, Types } from "mongoose";

const userShema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const userModel = model("User", userShema);

const contentSchema = new Schema({
  title: String,
  link: String,
  type: String,
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

export const contentModel = model("Content", contentSchema);

const linkSchema = new Schema({
  hash: String,
  userId: { type: Types.ObjectId, ref: "User", required: true, unique: true },
});

export const linkModel = model("Links", linkSchema);
