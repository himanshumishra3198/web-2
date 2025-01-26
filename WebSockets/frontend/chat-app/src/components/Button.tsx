import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  onClick?: () => void;
  icon?: ReactElement;
  text?: string;
  disabled?: boolean;
}
export function Button({
  variant,
  icon,
  onClick,
  text,
  disabled,
}: ButtonProps) {
  return (
    <div
      className={`${
        disabled ? "bg-gray-800" : ""
      } w-full flex justify-center items-center rounded p-3 cursor-pointer gap-2
        ${
          variant === "primary"
            ? "bg-gray-700 text-white hover:bg-gray-800 transition-all duration-400"
            : "bg-blue-400 text-black"
        }`}
      onClick={onClick}
    >
      {icon}
      {text}
    </div>
  );
}
