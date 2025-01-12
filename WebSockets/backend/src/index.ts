import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface user {
  socket: WebSocket;
  roomId: string;
}

let users: user[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (data) => {
    //@ts-ignore
    const parsedMessage = JSON.parse(data);
    if (parsedMessage.type === "join") {
      users.push({
        socket: socket,
        roomId: parsedMessage.payload.roomId,
      });
    } else if (parsedMessage.type === "chat") {
      let currUser = users.find((user) => user.socket === socket);

      users.forEach((user) => {
        if (user.roomId === currUser?.roomId) {
          const newMessage = {
            type: "chat",
            payload: {
              message: parsedMessage.payload.message,
            },
          };
          user.socket.send(JSON.stringify(newMessage));
        }
      });
    }
  });
  socket.on("close", () => {
    users = users.filter((user) => user.socket !== socket);
  });
});
