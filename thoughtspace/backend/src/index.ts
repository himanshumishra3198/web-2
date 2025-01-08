import express, { Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userMiddleware } from "./authMiddleware";
import cors from "cors";

import { contentModel, linkModel, userModel } from "./db";
import { random } from "./utils";
const PORT: number = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL ? process.env.MONGO_URL : "";
mongoose.connect(MONGO_URL);

app.get("/", (req, res) => {
  res.send("Hellow world");
});

app.post(
  "/api/v1/signup",
  async (req: Request, res: Response): Promise<any> => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(password);
    const userSchema = z.object({
      username: z
        .string()
        .min(3, { message: "Username must be atleast three characters long" })
        .max(10, { message: "Username must not exceed 10 characters" }),
      password: z
        .string()
        .min(8, { message: "Password must be atleast 8 characters long" })
        .max(20, { message: "Password must not exceed 20 characters long" })
        .regex(/[A-Z]/, {
          message: "Password must contain atleast one uppercase letter",
        })
        .regex(/[a-z]/, {
          message: "Password must contain atleast one lowercase letter",
        })
        .regex(/[0-9]/, { message: "Password must contain atleast one number" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
          message: "Password must contain atleast one special character",
        }),
    });

    const result = userSchema.safeParse({ username, password });
    if (!result.success) {
      return res.status(411).json({
        message: result.error.errors,
      });
    }

    try {
      const user = await userModel.findOne({ username });
      if (user) {
        res.status(402).json({
          message: "User already exists",
        });
      } else {
        bcrypt.hash(password, 5, async function (err, hashedPassword) {
          if (!err) {
            const user = await userModel.create({
              username: username,
              password: hashedPassword,
            });
            res.status(200).json({
              message: "Signup successful",
            });
          } else {
            throw new Error(String(err));
          }
        });
      }
    } catch (e) {
      res.status(500).json({
        message: e,
      });
    }
  }
);

app.post(
  "/api/v1/signin",
  async (req: Request, res: Response): Promise<any> => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await userModel.findOne({ username });
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
      return;
    }

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const exsistingPassword = user.password ? user.password : "";

    const match = await bcrypt.compare(password, exsistingPassword);
    const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
    console.log(user);
    if (match) {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res.status(200).json({
        token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  }
);

app.post(
  "/api/v1/content",
  userMiddleware,
  async (req: Request, res: Response) => {
    try {
      const content = await contentModel.create({
        userId: req.body._id,
        title: req.body.title,
        link: req.body.link,
        type: req.body.type,
      });
      res.status(200).json({
        message: "saved successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: e,
      });
    }
  }
);

app.get(
  "/api/v1/content",
  userMiddleware,
  async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.body._id;
    const contents = await contentModel
      .find({
        userId: userId,
      })
      .populate("userId", "username");

    res.status(200).json({
      contents,
    });
  }
);

app.delete(
  "/api/v1/content",
  userMiddleware,
  async (req: Request, res: Response) => {
    console.log(req.body);
    await contentModel.deleteMany({
      contentId: req.params.contentId,
      userId: req.body._id,
    });
    res.status(200).json({
      message: "deleted successfully",
    });
  }
);

app.post(
  "/api/v1/thought/share",
  userMiddleware,
  async (req: Request, res: Response) => {
    const share = req.body.share;
    if (share) {
      const existingLink = await linkModel.findOne({ userId: req.body._id });
      if (existingLink) {
        res.status(200).json({
          hash: existingLink.hash,
        });
        return;
      }
      const hash = random(10);
      await linkModel.create({
        userId: req.body._id,
        hash: hash,
      });
      res.status(200).json({
        hash: hash,
      });
    } else {
      await linkModel.deleteOne({
        userId: req.body._id,
      });
      res.status(200).json({
        message: "Link deleted successfully",
      });
    }
  }
);

app.get(
  "/api/v1/thought/:shareLink",

  async (req: Request, res: Response) => {
    const hash = req.params.shareLink;
    try {
      const link = await linkModel.findOne({
        hash: hash,
      });
      if (link) {
        const sharedUserId = link.userId;
        const sharedContent = await contentModel
          .find({ userId: sharedUserId })
          .populate("userId", "username");
        res.status(200).json({
          content: sharedContent,
        });
      } else {
        res.status(403).json({
          message: "share link is not valid",
        });
      }
    } catch (e) {
      res.status(500).json({
        message: e,
      });
    }
  }
);

app.listen(PORT, () => {
  console.log("App is listening on port ", PORT);
});
