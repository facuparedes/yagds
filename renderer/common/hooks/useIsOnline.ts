import { ipcRenderer } from "electron";
import { useState, useEffect } from "react";
import { ifNotExistOn } from "../functions";

export default function useIsOnline() {
  const [previousIsOnline, setPreviousIsOnline] = useState<boolean>(null);
  const [isOnline, setIsOnline] = useState<boolean>(null);
  const [retryingCountdown, setRetryingCountdown] = useState(5000);

  useEffect(() => {
    ifNotExistOn("onlineStatus", (_, _isOnline, _retryingCountdown) => {
      setIsOnline((prevIsOnline) => {
        setPreviousIsOnline(prevIsOnline);
        return _isOnline;
      });
      setRetryingCountdown(_retryingCountdown);
    }).send("onlineStatus");

    return () => {
      setIsOnline(null);
      setRetryingCountdown(5000);
      ipcRenderer.removeAllListeners("onlineStatus");
    };
  }, []);

  return <[boolean, boolean, number]>[previousIsOnline, isOnline, retryingCountdown / 1000];
}
