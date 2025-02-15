"use client";

import { useState } from "react";
import {
  MousePointer2,
  Square,
  Diamond,
  Circle,
  ArrowRight,
  Minus,
  Pencil,
  Type,
  Eraser,
} from "lucide-react";

const tools = [
  { name: "Select", icon: MousePointer2 },
  { name: "Eraser", icon: Eraser },
  { name: "Rectangle", icon: Square },
  { name: "Diamond", icon: Diamond },
  { name: "Circle", icon: Circle },
  { name: "Arrow", icon: ArrowRight },
  { name: "Line", icon: Minus },
  { name: "Pencil", icon: Pencil },
  { name: "Text", icon: Type },
];

export default function Toolbar({
  selectedTool,
  changeTool,
}: {
  selectedTool: string;
  changeTool: (tool: string) => void;
}) {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white/9 shadow-lg rounded-lg p-2 space-y-2">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.name}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              selectedTool === tool.name
                ? "bg-blue-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => changeTool(tool.name)}
            aria-label={tool.name}
            title={tool.name}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}
