import { JWT_SECRET } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocketServer, WebSocket } from "ws";
import { prismaClient } from "@repo/db/client";
const wss = new WebSocketServer({ port: 8080 });

// const users = [
//   {userId: 1
//     ws: WebSocket,
//     rooms: array of room ids
//   }
// ]

// message = {
//   type: "join_room",
//   roomId: int
// }
// {
//   type: "chat",
//   message: "message"
//   roomId: 123
// }

interface UsersSchema {
  userId: string;
  ws: WebSocket;
  rooms: string[];
}

const users: UsersSchema[] = [];

function verifyUser(token: string) {
  if (typeof token !== "string") {
    return null;
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof decoded === "string" || !decoded.userId) {
    return null;
  }
  const userId = decoded.userId;
  return userId;
}

function notAlreadySubscribed(rooms: string[], roomId: string) {
  const present = rooms.find((id) => roomId === id);
  if (present) return false;
  else return true;
}

wss.on("connection", (ws, req) => {
  const queryParams = new URLSearchParams(req.url?.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = verifyUser(token);
  if (!userId) {
    ws.close();
    return;
  }
  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async (data) => {
    const parsedData = JSON.parse(data as unknown as string);
    const user = users.find((user) => user.ws === ws);
    if (!user) return;

    if (parsedData.type === "join_room") {
      if (user && notAlreadySubscribed(user.rooms, parsedData.roomId))
        user.rooms.push(parsedData.roomId);
    } else if (parsedData.type === "leave_room") {
      user.rooms = user.rooms.filter(
        (roomId) => roomId === String(parsedData.roomId)
      );
    } else if (parsedData.type === "chat") {
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: {
          roomId: parsedData.roomId,
          message: parsedData.message,
          userId: user.userId,
        },
      });

      users.map((eachUser) => {
        if (eachUser.rooms.includes(parsedData.roomId)) {
          eachUser.ws.send(
            JSON.stringify({
              type: "chat",
              message: parsedData.message,
              roomId: parsedData.roomId,
            })
          );
        }
      });
    }
  });
});
