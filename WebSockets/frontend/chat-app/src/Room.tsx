import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { InputBox } from "./components/InputBox";
import { MessageBox } from "./components/MessageBox";
import { useRef } from "react";
export function Room() {
  const [messages, setMessages] = useState([]);
  let messageRef = useRef<HTMLInputElement>();
  let socket = useRef<WebSocket>();

  function handleSend() {
    // @ts-ignore
    socket.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          // @ts-ignore
          message: messageRef.current.value,
        },
      })
    );
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (ev) => {
      const message = JSON.parse(ev.data);
      //@ts-ignore
      setMessages((prev) => [...prev, message.payload.message]);
    };
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: localStorage.getItem("roomId"),
          },
        })
      );
    };
    socket.current = ws;
    return () => {
      ws.close();
    };
  }, []);
  return (
    <div className="w-screen h-screen bg-gray-800 text-white font-mono">
      <div className="h-4/5 bg-gray-900 flex pl-32 pt-8 flex-col gap-2 flex-wrap">
        {messages.map((message) => (
          <MessageBox text={message} />
        ))}
      </div>
      <div className="flex items-center justify-center p-8 gap-2">
        <InputBox placeholder="message..." reference={messageRef} />
        <div>
          <Button variant="primary" text="Send" onClick={handleSend} />
        </div>
      </div>
    </div>
  );
}
