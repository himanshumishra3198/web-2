import { Button } from "./components/Button";
import { InputBox } from "./components/InputBox";
import { GenerateRoom } from "./utility/GenerateRoom";
import { CopyIcon } from "./icons/CopyIcon";
import { GenerateIcon } from "./icons/GenerateIcon";
import { JoinIcon } from "./icons/JoinIcon";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export function Dashboard() {
  let inputRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  function createRoom() {
    //@ts-ignore
    localStorage.setItem("roomId", inputRef.current.value);
    navigate("/room");
  }

  function handleCopy() {
    // @ts-ignore
    navigator.clipboard.writeText(inputRef.current.value);
    inputRef.current?.select();
  }

  function generateId() {
    const roomId = GenerateRoom();
    //@ts-ignore
    inputRef.current.value = roomId;
  }

  return (
    <div className="font-mono h-screen w-screen bg-gray-800 flex items-center justify-center">
      <div className="w-80 h-80 bg-gray-900 rounded-md flex items-center justify-center flex-col gap-2">
        <div className="w-80 p-2 flex gap-1">
          <div className="min-w-60">
            <InputBox
              placeholder="Enter room id..."
              fullWidth={true}
              reference={inputRef}
            />
          </div>

          <Button icon={<CopyIcon />} variant="primary" onClick={handleCopy} />
        </div>

        <div className="w-full p-2 flex flex-col gap-4">
          <Button
            variant="primary"
            text="Join room"
            onClick={createRoom}
            icon={<JoinIcon />}
          />
          <Button
            variant="primary"
            text="Generate room"
            onClick={generateId}
            icon={<GenerateIcon />}
          />
        </div>
      </div>
    </div>
  );
}
