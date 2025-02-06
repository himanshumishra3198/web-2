import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  variant: "primary" | "secondary";
  onClick?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
}
export function Button({
  text,
  variant,
  onClick,
  icon,
  disabled,
}: ButtonProps) {
  const ButtonVariant = {
    primary:
      "px-8 py-3 bg-white text-[#1A1F2C] rounded font-medium hover:bg-white/90 transition-colors",
    secondary:
      "px-8 py-3 border border-white/20 rounded font-medium hover:bg-white/10 transition-colors",
  };
  return (
    <button
      onClick={onClick}
      className={`${disabled && variant === "secondary" ? "bg-white/10" : ""} cursor-pointer font-mono ${ButtonVariant[variant]} flex gap-2 items-center ui-justify-center`}
      disabled={disabled}
    >
      {icon} {text}
    </button>
  );
}
