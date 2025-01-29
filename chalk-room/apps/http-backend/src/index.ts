// start from the signup endpoint
import express from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import {
  CreateUserSchema,
  SigninUserSchema,
  CreateRoomSchema,
} from "@repo/common/types";

const app = express();

app.use(express.json());

app.post("/signup", (req: Request, res: Response) => {
  const parsed = CreateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid input",
    });
    return;
  }

  res.send(JWT_SECRET);
});

app.post("/signin", (req: Request, res: Response) => {
  const parsed = SigninUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid input",
    });
    return;
  }
  res.status(200).json({
    message: "signin successful!",
  });
});

app.post("/room", (req: Request, res: Response) => {
  const parsed = CreateRoomSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid room name",
    });
    return;
  }
  res.status(200).json({
    message: "room created successfully",
  });
});

app.listen(3001);
