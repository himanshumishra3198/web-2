import { Shape } from "./shapes";

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  existingShapes: Shape[]
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      (ctx.strokeStyle = "white"),
        ctx.strokeRect(shape.x, shape.y, shape.height, shape.width);
    }
  });
}
