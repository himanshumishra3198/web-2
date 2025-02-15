import axios from "axios";

import { Shape } from "./shapes";
import { BACKEND_URL } from "../app/configs";
import { X } from "lucide-react";

export function clearCanvas(
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement,
  existingShapes: Shape[]
) {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    existingShapes.map((shape) => {
      if (shape.type === "Rectangle") {
        ctx.strokeStyle = "white";
        ctx.strokeRect(shape.x, shape.y, shape.height, shape.width);
      } else if (shape.type === "Circle") {
        createCircle({
          x: shape.x,
          y: shape.y,
          radius: shape.radius,
          color: "white",
          ctx,
        });
      } else if (shape.type === "Diamond") {
        createDiamond({
          x: shape.x,
          y: shape.y,
          height: shape.height,
          width: shape.width,
          color: "white",
          ctx: ctx,
        });
      } else if (shape.type === "Line") {
        createLine({
          startX: shape.startX,
          startY: shape.startY,
          x: shape.x,
          y: shape.y,
          color: "white",
          ctx,
        });
      } else if (shape.type === "Arrow") {
        createArrow({
          ctx,
          startX: shape.startX,
          startY: shape.startY,
          x: shape.x,
          y: shape.y,
        });
      } else if (shape.type === "Pencil") {
        createPencil({ ctx, points: shape.points, color: "white" });
      }
    });
  }
}

export function createPencil({
  ctx,
  points,
  color,
}: {
  ctx: CanvasRenderingContext2D | null;
  points: { x: number; y: number }[];
  color: string;
}) {
  if (!ctx || points.length < 2) return;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  ctx.stroke();
}

export function createArrow({
  ctx,
  startX,
  startY,
  x,
  y,
}: {
  ctx: CanvasRenderingContext2D | null;
  startX: number;
  startY: number;
  x: number;
  y: number;
}) {
  if (ctx) {
    var headlen = 10; // length of head in pixels
    var dx = x - startX;
    var dy = y - startY;
    var angle = Math.atan2(dy, dx);
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.lineTo(
      x - headlen * Math.cos(angle - Math.PI / 6),
      y - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(x, y);
    ctx.lineTo(
      x - headlen * Math.cos(angle + Math.PI / 6),
      y - headlen * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  }
}

export function createDiamond({
  x,
  y,
  height,
  width,
  color,
  ctx,
}: {
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
  ctx: CanvasRenderingContext2D | null;
}) {
  if (ctx) {
    let context = ctx;
    context.beginPath();
    context.moveTo(x, y);

    // top left edge
    context.lineTo(x - width / 2, y + height / 2);

    // bottom left edge
    context.lineTo(x, y + height);

    // bottom right edge
    context.lineTo(x + width / 2, y + height / 2);

    // closing the path automatically creates
    // the top right edge
    context.closePath();
    context.strokeStyle = color;
    context.stroke();
  }
}

export function createLine({
  startX,
  startY,
  x,
  y,
  color,
  ctx,
}: {
  startX: number;
  startY: number;
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D | null;
}) {
  // Start a new Path
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);

    // Draw the Path
    ctx.stroke();
  }
}

export function createCircle({
  x,
  y,
  radius,
  color,
  ctx,
}: {
  x: number;
  y: number;
  radius: number;
  color: string;
  ctx: CanvasRenderingContext2D | null;
}) {
  if (ctx) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

export async function getExistingShapes(roomId: number) {
  const token = localStorage.getItem("token");
  const res = await axios.get(BACKEND_URL + `/chat/${roomId}`, {
    headers: {
      Authorization: token,
    },
  });

  if (res.status == 200) {
    const messages = res.data.messages;
    let shapes = messages.map((x: { message: string }) => {
      const message = JSON.parse(x.message);
      return message;
    });

    return shapes;
  } else {
    console.log(res.data);
    return [];
  }
}
