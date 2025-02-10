import axios from "axios";

import { Shape } from "./shapes";
import { BACKEND_URL } from "../app/configs";

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
