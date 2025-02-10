"use client";

import { useEffect, useRef, useState } from "react";
import { InitDraw } from "../../../../draw";
import { BACKEND_URL, WEBSOCKET_URL } from "../../../configs";
import axios from "axios";
import { useGiveRoom } from "../../../../hooks/useGiveRoom";

export default function Canvas({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socket = useRef<WebSocket | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const { loading, room, error } = useGiveRoom(params);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);
    ws.onopen = () => {
      if (!room)
        return () => {
          ws.close();
        };
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId: room.id,
        })
      );
    };
    socket.current = ws;
    return () => {
      ws.close();
    };
  }, [room?.id]);

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
    if (!canvasRef.current) return;
    const myCanvas = canvasRef.current;
    const ctx = myCanvas.getContext("2d");
    if (!ctx) return;
    InitDraw({ myCanvas, ctx, ws: socket.current, room });
  }, [canvasSize, canvasRef]);

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
