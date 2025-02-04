"use client";
import { useEffect, useState } from "react";
export default function Dashboard() {
  let [token, setToken] = useState<string | null>("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return <div>welcome {token}</div>;
}
