import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { ifNotExistOnce } from "../functions";

export default function useisLoggedIn() {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(null);

  useEffect(() => {
    ifNotExistOnce("isLoggedIn", (_, _isLoggedIn) => setisLoggedIn(_isLoggedIn)).send("isLoggedIn");

    return () => void ipcRenderer.removeAllListeners("isLoggedIn");
  }, []);

  return <[boolean]>[isLoggedIn];
}
