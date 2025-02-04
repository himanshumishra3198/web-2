"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "./play";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

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

  function help() {
    if (!canvasRef.current) return;
    const myCanvas = canvasRef.current;
    const ctx = myCanvas.getContext("2d");
    if (!ctx) return;
    Play({ myCanvas, ctx });
  }

  useEffect(() => {
    help();
  }, [canvasSize]);

  return (
    <div className="h-screen w-screen bg-black grid grid-cols-8 grid-rows-1">
      <div className="col-span-2 border-white/10 border-r-2"></div>
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
