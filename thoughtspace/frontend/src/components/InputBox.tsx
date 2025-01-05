interface InputBoxProps {
  type: string;
  onChange: () => void;
  placeHolder: string;
}
export function InputBox({ type, onChange, placeHolder }: InputBoxProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeHolder}
        onChange={onChange}
        className="px-4 py-2 border-stone-950 rounded m-2"
      />
    </div>
  );
}
