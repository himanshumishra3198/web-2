interface InputBoxProps {
  type: string;
  reference: any;
  placeHolder: string;
}
export function InputBox({ type, placeHolder, reference }: InputBoxProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeHolder}
        ref={reference}
        className="px-4 py-2 border-stone-950 rounded m-2"
      />
    </div>
  );
}
