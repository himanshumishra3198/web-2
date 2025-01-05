import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { InputBox } from "./InputBox";

export function CreateContentModel({ open, onClose }) {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen fixed flex justify-center items-center bg-slate-500 top-0 left-0 opacity-60">
          <div className="bg-white p-4 opacity-100 rounded">
            <div className="flex justify-end">
              <div className="cursor-pointer" onClick={onClose}>
                <CloseIcon />
              </div>
            </div>
            <div>
              <InputBox type="text" placeHolder="Title" onChange={() => {}} />
              <InputBox type="text" placeHolder="Link" onChange={() => {}} />
            </div>
            <div className="flex justify-center">
              <Button variant="primary" text={"Submit"} onClick={() => {}} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
