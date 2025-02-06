import { ReactNode } from "react";
import { Shape } from "./shapes";
import { clearCanvas } from "./utils";
interface PlayProps {
  myCanvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

function getMousePosition(canvas: HTMLCanvasElement, event: MouseEvent) {
  let rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

const existingShapes: Shape[] = [];

export function InitDraw({ myCanvas, ctx }: PlayProps) {
  if (!ctx) return;

  let clicked = false;
  let startX = 0,
    startY = 0;
  myCanvas.addEventListener("mousedown", (e) => {
    console.log(typeof e);
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
  });

  myCanvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      clearCanvas(ctx, myCanvas, existingShapes);
      ctx.strokeStyle = "white";
      let { x, y } = getMousePosition(myCanvas, e);
      ctx.strokeRect(startX, startY, x - startX, y - startY);
    }
  });
}
