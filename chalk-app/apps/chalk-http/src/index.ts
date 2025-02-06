import express from "express";
import { prismaClient } from "@repo/db/client";
import cors from "cors";
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
app.use(cors());

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

app.use(auth);

app.get("/room", async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  //@ts-ignore
  console.log(req.userId);
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: req.body.slug,
        description: req.body.description || "",
        // @ts-ignore
        adminId: req.userId,
      },
    });

    await prismaClient.roomUser.create({
      data: {
        //@ts-ignore
        userId: req.userId,
        roomId: room.id,
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

app.get("/slugToRoom/:slug", async (req, res) => {
  try {
    const room = await prismaClient.room.findFirst({
      where: {
        slug: req.params.slug,
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

app.post("/joinRoom/:roomId", async (req, res) => {
  try {
    const existingEntry = await prismaClient.roomUser.findFirst({
      where: {
        roomId: Number(req.params.roomId),
        //@ts-ignore
        userId: req.userId,
      },
    });

    if (existingEntry) {
      res.status(402).json({
        message: "User has already joined the room",
      });
      return;
    }
    await prismaClient.roomUser.create({
      data: {
        roomId: Number(req.params.roomId),
        //@ts-ignore
        userId: req.userId,
      },
    });

    res.status(200).json({
      message: "succesfully joined",
    });
  } catch (e) {
    res.status(401).json({
      message: e,
    });
  }
});

app.post("/leaveRoom/:roomId", async (req, res) => {
  try {
    await prismaClient.roomUser.delete({
      where: {
        roomId: Number(req.params.roomId),
        //@ts-ignore
        userId: req.userId,
      },
    });

    res.status(200).json({
      message: "leave successful",
    });
  } catch (e) {
    res.status(401).json({
      message: e,
    });
  }
});

app.listen(3001);
