import { ReactNode } from "react";
import { Shape } from "./shapes";
import { clearCanvas, getExistingShapes } from "./utils";
interface PlayProps {
  myCanvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  ws: WebSocket | null;
  room: any;
}

function getMousePosition(canvas: HTMLCanvasElement, event: MouseEvent) {
  let rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

// const existingSh apes: Shape[] = [];

export async function InitDraw({ myCanvas, ctx, ws, room }: PlayProps) {
  if (!room) return;
  let existingShapes: Shape[] = await getExistingShapes(room.id);
  clearCanvas(ctx, myCanvas, existingShapes);
  if (!ws) return;
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

  myCanvas.addEventListener("mousedown", (e) => {
    console.log(getMousePosition(myCanvas, e));
    clicked = true;
    let { x, y } = getMousePosition(myCanvas, e);
    startX = x;
    startY = y;
  });

  myCanvas.addEventListener("mouseup", (e) => {
    clicked = false;
    let { x, y } = getMousePosition(myCanvas, e);

    existingShapes.push({
      type: "rect",
      x: startX,
      y: startY,
      height: x - startX,
      width: y - startY,
    });

    const message = JSON.stringify({
      type: "rect",
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
  });

  myCanvas.addEventListener("mousemove", (e) => {
    if (clicked && ctx) {
      clearCanvas(ctx, myCanvas, existingShapes);
      ctx.strokeStyle = "white";
      let { x, y } = getMousePosition(myCanvas, e);
      ctx.strokeRect(startX, startY, x - startX, y - startY);
    }
  });
}
