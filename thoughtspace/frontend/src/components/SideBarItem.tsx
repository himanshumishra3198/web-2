import { ReactElement } from "react";

export function SideBarItem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex gap-2 text-gray-700 p-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-2 transition-all duration-200">
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
}
