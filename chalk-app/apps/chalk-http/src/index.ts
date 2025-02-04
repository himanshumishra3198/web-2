import express from "express";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import {
  CreateUserSchema,
  SigninUserSchema,
  CreateRoomSchema,
  JWT_SECRET,
} from "@repo/common/config";
import { auth } from "./middleware";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (parsedData.success) {
    try {
      const user = await prismaClient.user.create({
        data: {
          email: parsedData.data.email,
          name: parsedData.data.name,
          password: parsedData.data.password,
        },
      });
      res.status(201).json({
        user,
      });
      return;
    } catch (e) {
      res.status(403).json({
        error: e,
      });
      return;
    }
  } else {
    res.status(401).json({
      error: parsedData.error,
    });
  }
});

app.post("/login", async (req, res) => {
  const parsedData = SigninUserSchema.safeParse(req.body);
  if (parsedData.success) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email,
        password: parsedData.data.password,
      },
    });
    if (user) {
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      res.status(200).json({
        token,
      });
    }
  } else {
    res.status(401).json({
      error: parsedData.error,
    });
  }
});

app.post("/room", auth, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: req.body.slug,
        // @ts-ignore
        adminId: req.userId,
      },
    });
    res.status(200).json({
      room,
    });
  } catch (e) {
    res.status(401).json({
      message: e,
    });
  }
});

app.listen(3001);
