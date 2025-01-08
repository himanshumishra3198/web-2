import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-gray-300 flex justify-center items-center">
      <div className="min-w-48 min-h-48 bg-gray-250 rounded border flex flex-col justify-center items-center gap-4 p-2">
        <Button
          variant="primary"
          text="Sign up"
          fullWidth={true}
          onClick={() => {
            navigate("/signup");
          }}
        />
        <Button
          variant="primary"
          text="Sign in"
          fullWidth={true}
          onClick={() => {
            navigate("/signin");
          }}
        />
      </div>
    </div>
  );
}
