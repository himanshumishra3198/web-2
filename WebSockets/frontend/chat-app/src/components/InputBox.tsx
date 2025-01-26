interface InputProps {
  disabled?: boolean;
  text?: string;
  reference?: any;
  placeholder?: string;
  fullWidth?: boolean;
}
export function InputBox({
  text,
  disabled,
  reference,
  placeholder,
  fullWidth,
}: InputProps) {
  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        ref={reference}
        disabled={disabled}
        value={text}
        className={`outline-none focus:border-none focus:ring-0 border-none text-center ${
          fullWidth ? "w-full" : ""
        } p-2 rounded ${
          disabled ? "bg-gray-500 text-white" : "bg-gray-300 text-black"
        }`}
        placeholder={placeholder}
      />
    </div>
  );
}
