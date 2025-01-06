import { ReactElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  text: String;
  startIcon?: ReactElement;
  onClick?: () => void;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};
const defaultStyles = "px-4 py-2 rounded-md font-light";

export const Button = ({ variant, text, startIcon, onClick }: ButtonProps) => {
  return (
    <button
      className={variantClasses[variant] + " " + defaultStyles}
      onClick={onClick}
    >
      <div className="flex items-center">
        {startIcon}
        <div className="pl-2">{text}</div>
      </div>
    </button>
  );
};