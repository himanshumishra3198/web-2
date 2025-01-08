import { useRef } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username);
    console.log(password);

    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  }
  return (
    <div className="h-screen w-screen flex bg-gray-200 justify-center items-center">
      <div className="bg-white min-w-48 p-8">
        <InputBox placeHolder="Username" type="text" reference={usernameRef} />
        <InputBox placeHolder="Password" type="text" reference={passwordRef} />
        <Button
          variant="primary"
          text={"Signin"}
          fullWidth={true}
          //   loading={true}
          onClick={signin}
        />
      </div>
    </div>
  );
}
