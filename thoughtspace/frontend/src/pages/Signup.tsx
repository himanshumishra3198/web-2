import { useRef } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username);
    console.log(password);
    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
    });
    navigate("/signin");
  }

  return (
    <div className="h-screen w-screen flex bg-gray-200 justify-center items-center">
      <div className="bg-white min-w-48 p-8">
        <InputBox placeHolder="Username" type="text" reference={usernameRef} />
        <InputBox placeHolder="Password" type="text" reference={passwordRef} />
        <Button
          variant="primary"
          text={"Signup"}
          fullWidth={true}
          //   loading={true}
          onClick={signup}
        />
      </div>
    </div>
  );
}
