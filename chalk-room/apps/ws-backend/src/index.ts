import { JWT_SECRET } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
  const queryParams = new URLSearchParams(req.url?.split("?")[1]);
  const token = queryParams.get("token") || "";
  if (typeof token !== "string") {
    ws.close();
  }

  const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;
  if (!userId) {
    ws.close();
  }
});
