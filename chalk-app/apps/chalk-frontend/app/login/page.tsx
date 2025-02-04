"use client";
import { Button } from "@repo/ui/button";
import { InputBox } from "@repo/ui/input";
import axios from "axios";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../configs";
export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function handleLogin() {
    console.log("hello");
    try {
      console.log(emailRef.current?.value);
      console.log(passwordRef.current?.value);
      if (!(emailRef.current && passwordRef.current)) {
        return;
      }
      const response = await axios.post(BACKEND_URL + "/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      } else {
        console.log(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="w-screen flex h-screen items-center justify-center">
      <div className="border border-white/10 bg-white/5 text-white p-4 rounded">
        <div className="text-white flex items-center justify-center p-4 font-mono font-extrabold">
          Chalk
        </div>
        <div className="flex items-center flex-col gap-4">
          <InputBox reference={emailRef} placeholder="email" type="text" />
          <InputBox
            reference={passwordRef}
            placeholder="password"
            type="password"
          />
        </div>
        <div className="text-white p-4 flex items-center justify-center">
          <Button
            text="Login"
            variant="secondary"
            onClick={() => {
              handleLogin();
            }}
          />
        </div>
      </div>
    </div>
  );
}
