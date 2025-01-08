import { useRef, useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";
enum variants {
  youtube = "youtube",
  twitter = "twitter",
}
export function CreateContentModel({ open, onClose }) {
  const [variantType, setVariantType] = useState("");
  const linkRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>();

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const type = variantType;

    await axios.post(
      BACKEND_URL + "/api/v1/content",
      {
        title,
        link,
        type,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    onClose();
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen fixed flex justify-center items-center bg-slate-500 top-0 left-0 bg-opacity-60">
          <div className="bg-white p-4 opacity-100 rounded">
            <div className="flex justify-end">
              <div className="cursor-pointer" onClick={onClose}>
                <CloseIcon />
              </div>
            </div>
            <div>
              <InputBox type="text" placeHolder="Title" reference={titleRef} />
              <InputBox type="text" placeHolder="Link" reference={linkRef} />
            </div>
            <div className="p-2">
              <h1 className="pl-4">Type: </h1>
              <div className="flex justify-center items-center gap-2 p-4">
                <Button
                  text={"youtube"}
                  variant={`${
                    variantType === variants.youtube ? "primary" : "secondary"
                  }`}
                  onClick={() => {
                    setVariantType(variants.youtube);
                  }}
                />
                <Button
                  text={"twitter"}
                  variant={`${
                    variantType === variants.twitter ? "primary" : "secondary"
                  }`}
                  onClick={() => {
                    setVariantType(variants.twitter);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button variant="primary" text={"Submit"} onClick={addContent} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
