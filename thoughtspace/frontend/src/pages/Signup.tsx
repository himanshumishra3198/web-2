import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export function Signup() {
  return (
    <div className="h-screen w-screen flex bg-gray-200 justify-center items-center">
      <div className="bg-white min-w-48 p-8">
        <InputBox placeHolder="Username" type="text" onChange={() => {}} />
        <InputBox placeHolder="Password" type="text" onChange={() => {}} />
        <Button
          variant="primary"
          text={"Signup"}
          fullWidth={true}
          loading={true}
        />
      </div>
    </div>
  );
}
