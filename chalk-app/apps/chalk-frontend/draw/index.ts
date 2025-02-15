import { ReactNode } from "react";
import { Shape } from "./shapes";
import {
  clearCanvas,
  createArrow,
  createCircle,
  createDiamond,
  createLine,
  createPencil,
  getExistingShapes,
} from "./utils";
import { Circle } from "lucide-react";
interface PlayProps {
  myCanvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  ws: WebSocket | null;
  room: any;
  selectedTool: string;
}

function getMousePosition(canvas: HTMLCanvasElement, event: MouseEvent) {
  let rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

// const existingSh apes: Shape[] = [];

export async function InitDraw({
  myCanvas,
  ctx,
  ws,
  room,
  selectedTool,
}: PlayProps) {
  if (!ctx || !ws || !room) return;
  let existingShapes: Shape[] = await getExistingShapes(room.id);
  clearCanvas(ctx, myCanvas, existingShapes);

  ws.onmessage = (e) => {
    const message = JSON.parse(e.data);
    if (message.type === "chat") {
      existingShapes.push(JSON.parse(message.message));
      clearCanvas(ctx, myCanvas, existingShapes);
    }
  };

  let clicked = false;
  let startX = 0,
    startY = 0;
  let points: { x: number; y: number }[] = [];

  myCanvas.addEventListener("mousedown", (e) => {
    clicked = true;
    let { x, y } = getMousePosition(myCanvas, e);

    startX = x;
    startY = y;
    points = [{ x, y }];
  });

  myCanvas.addEventListener("mouseup", (e) => {
    clicked = false;
    clearCanvas(ctx, myCanvas, existingShapes);
    let { x, y } = getMousePosition(myCanvas, e);
    let message;
    if (selectedTool === "Rectangle") {
      existingShapes.push({
        type: "Rectangle",
        x: startX,
        y: startY,
        height: x - startX,
        width: y - startY,
      });

      message = JSON.stringify({
        type: "Rectangle",
        x: startX,
        y: startY,
        height: x - startX,
        width: y - startY,
      });
      ws.send(
        JSON.stringify({
          type: "chat",
          message: message,
          roomId: room.id,
        })
      );
    } else if (selectedTool === "Circle") {
      const radius = Math.sqrt(
        (x - startX) * (x - startX) + (y - startY) * (y - startY)
      );
      existingShapes.push({
        type: "Circle",
        x: startX,
        y: startY,
        radius: radius,
      });
      message = JSON.stringify({
        type: "Circle",
        x: startX,
        y: startY,
        radius: radius,
      });

      ws.send(
        JSON.stringify({
          type: "chat",
          message: message,
          roomId: room.id,
        })
      );
    } else if (selectedTool === "Diamond") {
      existingShapes.push({
        type: "Diamond",
        x: startX,
        y: startY,
        height: x - startX,
        width: y - startY,
      });

      message = JSON.stringify({
        type: "Diamond",
        x: startX,
        y: startY,
        height: x - startX,
        width: y - startY,
      });
      ws.send(
        JSON.stringify({
          type: "chat",
          message: message,
          roomId: room.id,
        })
      );
    } else if (selectedTool === "Line") {
      existingShapes.push({
        type: "Line",
        startX,
        startY,
        x,
        y,
      });

      message = JSON.stringify({
        type: "Line",
        startX,
        startY,
        x,
        y,
      });
      ws.send(
        JSON.stringify({
          type: "chat",
          message: message,
          roomId: room.id,
        })
      );
    } else if (selectedTool === "Arrow") {
      existingShapes.push({
        type: "Arrow",
        startX,
        startY,
        x,
        y,
      });

      message = JSON.stringify({
        type: "Arrow",
        startX,
        startY,
        x,
        y,
      });
      ws.send(
        JSON.stringify({
          type: "chat",
          message: message,
          roomId: room.id,
        })
      );
    } else if (selectedTool === "Pencil") {
      existingShapes.push({
        type: "Pencil",
        points,
      });

      message = JSON.stringify({
        type: "Pencil",
        points,
      });
      ws.send(
        JSON.stringify({
          type: "chat",
          message: message,
          roomId: room.id,
        })
      );
      points = [];
    }
  });

  myCanvas.addEventListener("mousemove", (e) => {
    if (clicked && ctx) {
      clearCanvas(ctx, myCanvas, existingShapes);
      ctx.strokeStyle = "white";
      let { x, y } = getMousePosition(myCanvas, e);
      if (selectedTool === "Rectangle") {
        ctx.strokeRect(startX, startY, x - startX, y - startY);
      } else if (selectedTool === "Circle") {
        const radius = Math.sqrt(
          (x - startX) * (x - startX) + (y - startY) * (y - startY)
        );
        createCircle({
          x: startX,
          y: startY,
          radius: radius,
          color: "white",
          ctx,
        });
      } else if (selectedTool === "Diamond") {
        createDiamond({
          x: x,
          y: y,
          height: x - startX,
          width: y - startY,
          color: "white",
          ctx: ctx,
        });
      } else if (selectedTool === "Line") {
        createLine({ startX, startY, x, y, color: "white", ctx });
      } else if (selectedTool === "Arrow") {
        createArrow({ ctx, startX, startY, x, y });
      } else if (selectedTool === "Pencil") {
        let { x, y } = getMousePosition(myCanvas, e);
        points.push({ x, y });
        createPencil({ ctx, points, color: "white" });
      }
    }
  });
}
