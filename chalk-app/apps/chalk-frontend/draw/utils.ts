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
        drawDiamond(ctx, shape.startX, shape.startY, shape.x, shape.y, "white");
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
      } else if (shape.type === "Text") {
        createText(ctx, shape.text, shape.x, shape.y);
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

export function drawDiamond(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: string = "white"
) {
  const x = Math.min(startX, endX);
  const y = Math.min(startY, endY);
  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  const points = [
    { x: centerX, y: y }, // Top
    { x: x + width, y: centerY }, // Right
    { x: centerX, y: y + height }, // Bottom
    { x: x, y: centerY }, // Left
  ];

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.stroke();
}

export function createText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number
) {
  // Set default options
  const font = "16px Arial",
    color = "white",
    textAlign = "left",
    textBaseline = "top";

  // Apply styles
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;

  // Draw the text
  ctx.fillText(text, x, y);
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
