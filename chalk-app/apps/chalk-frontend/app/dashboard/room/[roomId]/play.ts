import { ReactNode } from "react";

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
export function Play({ myCanvas, ctx }: PlayProps) {
  if (!ctx) return;
  // ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  //   ctx.strokeStyle = "white";
  //   ctx.strokeRect(0, 0, 100, 100);
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
  });

  myCanvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      ctx.strokeStyle = "white";
      let { x, y } = getMousePosition(myCanvas, e);
      ctx.strokeRect(startX, startY, x - startX, y - startY);
    }
  });
}
