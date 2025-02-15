import { useEffect, useRef, useState } from "react";

import Toolbar from "./toolBar";

import { InitDraw } from "../../../draw";

export function MainCanvas({ room, ws }: { room: any; ws: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [selectedTool, setSelectedTool] = useState<string>("Select");

  useEffect(() => {
    const updateCanvasSize = () => {
      const parent = canvasRef.current?.parentElement;
      if (parent) {
        setCanvasSize({
          width: parent.clientWidth,
          height: parent.clientHeight,
        });
      }
    };

    updateCanvasSize(); // Set initial size
    window.addEventListener("resize", updateCanvasSize); // Update on resize

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const myCanvas = canvasRef.current;
      const ctx = myCanvas.getContext("2d");
      if (!ctx) return;
      InitDraw({ myCanvas, ctx, ws, room, selectedTool });
    }
  }, [canvasSize, selectedTool]);

  return (
    <div className="h-screen w-screen bg-black grid grid-cols-8 grid-rows-1">
      <div className="col-span-2 border-white/10 border-r-2">
        <Toolbar
          selectedTool={selectedTool}
          changeTool={(tool) => {
            setSelectedTool(() => {
              console.log(tool);
              return tool;
            });
          }}
        />
      </div>
      <div className="col-span-6">
        <canvas
          ref={canvasRef}
          className="bg-black block"
          width={canvasSize.width}
          height={canvasSize.height}
        ></canvas>
      </div>
    </div>
  );
}
