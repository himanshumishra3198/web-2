import { ReactElement } from "react";

export interface buttonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: String;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
}

const buttonSize = {
  sm: "py-1.5 px-3 text-sm",
  md: "py-3.5 px-5 text-lg",
  lg: "py-2.5 px-4 text-xl",
};

export const Button = (props: buttonProps) => {
  return (
    <div>
      <button
        className={`${
          props.variant === "primary"
            ? "bg-blue-700 hover:bg-blue-800 text-white"
            : "bg-blue-400 hover:bg-blue-500 text-black"
        } ${buttonSize[props.size]} rounded-md`}
        onClick={props.onClick}
      >
        <div className="flex">
          {props.startIcon}
          <div className="px-2">{props.text}</div>
        </div>
      </button>
    </div>
  );
};
