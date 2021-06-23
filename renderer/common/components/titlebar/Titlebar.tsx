import { ipcRenderer } from "electron";
import { Subtract16Regular, Maximize16Regular, Restore16Regular, Dismiss16Regular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import styles from "./Titlebar.module.css";

export default function Titlebar() {
  const [isMaximizedEnabled, setIsMaximizedEnabled] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);

  const changeMaximizeUnmaximizeIcon = () => setIsMaximized(ipcRenderer.sendSync("isMaximized"));

  useEffect(() => {
    setIsMaximizedEnabled(ipcRenderer.sendSync("isMaximizedEnabled"));
    console.log(ipcRenderer.sendSync("isMaximizedEnabled"));
    changeMaximizeUnmaximizeIcon();
  }, []);

  return (
    <div className={`bg-white w-full h-titlebar grid grid-cols-3 select-none ${styles.makeDraggable}`} onDoubleClick={() => isMaximizedEnabled && ipcRenderer.send("switch-maximize-unmaximize")}>
      <span className="col-start-2 text-center pointer-events-none text-sm" style={{ lineHeight: "30px" }}>
        YAGDS
      </span>
      <div className="grid grid-cols-3 w-fit-content justify-self-end">
        <button
          className={`w-titlebarButtons h-titlebarButtons focus:outline-none hover:bg-black hover:bg-opacity-10 ${styles.removeDraggable}`}
          title="Minimize"
          onClick={() => ipcRenderer.send("minimize")}
        >
          <Subtract16Regular className="flex justify-center content-center" />
        </button>
        <button
          className={`w-titlebarButtons h-titlebarButtons focus:outline-none hover:bg-black hover:bg-opacity-10 disabled:text-black disabled:text-opacity-30 ${
            !isMaximizedEnabled && "pointer-events-none"
          } ${styles.removeDraggable}`}
          title={!isMaximized ? "Maximize" : "Minimize"}
          onClick={() => {
            ipcRenderer.send("switch-maximize-unmaximize");
            changeMaximizeUnmaximizeIcon();
          }}
          disabled={!isMaximizedEnabled}
        >
          {!isMaximized ? <Maximize16Regular className="flex justify-center content-center" /> : <Restore16Regular className="flex justify-center content-center" />}
        </button>
        <button
          className={`w-titlebarButtons h-titlebarButtons focus:outline-none hover:bg-red-500 hover:text-white ${styles.removeDraggable}`}
          title="Close"
          onClick={() => ipcRenderer.send("close")}
        >
          <Dismiss16Regular className="flex justify-center content-center" />
        </button>
      </div>
    </div>
  );
}
