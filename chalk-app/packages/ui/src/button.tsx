interface ButtonProps {
  text: string;
  variant: "primary" | "secondary";
  onClick?: () => void;
}
export function Button({ text, variant, onClick }: ButtonProps) {
  const ButtonVariant = {
    primary:
      "px-8 py-3 bg-white text-[#1A1F2C] rounded font-medium hover:bg-white/90 transition-colors",
    secondary:
      "px-8 py-3 border border-white/20 rounded font-medium hover:bg-white/10 transition-colors",
  };
  return (
    <div
      onClick={onClick}
      className={`ui-cursor-pointer font-mono ${ButtonVariant[variant]}`}
    >
      {text}
    </div>
  );
}
