// start from the signup endpoint
import express from "express";
import { JWT_SECRET } from "@repo/backend-common/config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/db/client";
import {
  CreateUserSchema,
  SigninUserSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { auth } from "./middleware";

const app = express();

app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
  console.log(req.body);
  const parsed = CreateUserSchema.safeParse(req.body);
  console.log(parsed);
  if (!parsed.success) {
    res.status(400).json({
      message: parsed.error,
    });
    return;
  }

  const response = await prismaClient.user.create({
    data: {
      email: parsed.data.email,
      password: parsed.data.password,
      name: parsed.data.name,
    },
  });

  res.status(201).json({
    response,
  });
});

app.post("/signin", async (req: Request, res: Response) => {
  const parsed = SigninUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: parsed.error,
    });
    return;
  }
  const response = await prismaClient.user.findFirst({
    where: {
      email: parsed.data.email,
      password: parsed.data.password,
    },
  });

  if (!response) {
    res.status(400).json({
      message: "Invalid credentials",
    });
    return;
  }

  const token = jwt.sign({ userId: response.id }, JWT_SECRET);

  res.status(200).json({
    token: token,
  });
});

app.post("/room", auth, async (req: Request, res: Response) => {
  const parsed = CreateRoomSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid room name",
    });
    return;
  }

  const room = await prismaClient.room.create({
    data: {
      slug: parsed.data.name,
      // @ts-ignore
      adminId: req.userId,
    },
  });
  res.status(200).json({
    roomId: room.id,
  });
});

app.get("/chats/:roomId", async (req, res) => {
  const messages = await prismaClient.chat.findMany({
    where: {
      roomId: Number(req.params.roomId),
    },
    orderBy: {
      id: "desc",
    },
    take: 30,
  });
  res.status(200).json({
    messages,
  });
});

app.get("/room/:slug", auth, async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });

  res.status(200).json({
    room,
  });
});

app.listen(3001);
