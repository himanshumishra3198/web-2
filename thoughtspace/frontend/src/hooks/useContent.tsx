import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export function useContent() {
  const [contents, setContents] = useState([]);
  function refresh() {
    axios
      .get(BACKEND_URL + "/api/v1/content", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.contents);
      });
  }
  useEffect(() => {
    refresh();
  }, []);

  return { contents, refresh };
}
