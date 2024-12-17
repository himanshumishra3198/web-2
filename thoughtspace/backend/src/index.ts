import express, { Request, Response } from "express";
import mongoose from "mongoose";

const PORT: number = 3000;

const app = express();

mongoose
  .connect(
    "mongodb+srv://himanshumishra3198:universe0@cluster0.lapri.mongodb.net/thoughtspace"
  )
  .then(() => {
    console.log("We are connected");
  });

app.post("api/v1/signup", (req: Request, res: Response) => {});

app.post("api/v1/signin", (req: Request, res: Response) => {});

app.post("api/v1/content", (req: Request, res: Response) => {});

app.get("api/v1/content", (req: Request, res: Response) => {});

app.delete("api/v1/content", (req: Request, res: Response) => {});

app.post("api/v1/thought/share", (req: Request, res: Response) => {});

app.get("api/v1/thought/:shareLink", (req: Request, res: Response) => {});

app.listen(PORT, () => {
  console.log("App is listening on port ", PORT);
});
