import { JWT_SECRET } from "@repo/backend-common/config";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface customRequest extends Request {
  userId?: string;
}

export function auth(req: customRequest, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (typeof token !== "string") {
    res.status(401).json({
      message: "please provide jwt token",
    });
    return;
  }
  try {
    const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.userId = userId;
    next();
  } catch (e) {
    res.status(400).json({
      message: "invalid token",
    });
  }
}
