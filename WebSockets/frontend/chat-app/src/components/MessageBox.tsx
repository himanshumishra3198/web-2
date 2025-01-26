interface MessageProps {
  text: string;
}
export function MessageBox({ text }: MessageProps) {
  return (
    <div className="p-2 bg-gray-700 max-h-min rounded-md inline-block max-w-fit">
      {text}
    </div>
  );
}
