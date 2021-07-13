import { ipcRenderer } from "electron";
import { Subtract16Regular, Maximize16Regular, Restore16Regular, Dismiss16Regular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Titlebar.module.css";
import theme from "../../utils/theme";

export default function Titlebar() {
  const [pageTitle, setPageTitle] = useState("YAGDS");
  const [isMaximizedEnabled, setIsMaximizedEnabled] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    setPageTitle(document.title);
    ipcRenderer.once("isMaximizedEnabled", (_, _IsMaximizedEnabled) => setIsMaximizedEnabled(_IsMaximizedEnabled)).send("isMaximizedEnabled");
    ipcRenderer.once("isMaximized", (_, _IsMaximized) => setIsMaximized(_IsMaximized)).send("isMaximized");

    return () => void ipcRenderer.removeAllListeners("isMaximizedEnabled").removeAllListeners("isMaximized");
  }, []);

  return (
    <div
      className={`w-full h-titlebar grid grid-cols-3 bg-white absolute select-none z-50 ${styles.makeDraggable}`}
      onDoubleClick={() => isMaximizedEnabled && ipcRenderer.send("switch-maximize-unmaximize")}
      onAuxClick={(e) => ipcRenderer.send("display-app-menu", { x: e.pageX, y: e.pageY })}
    >
      <span className="col-start-2 text-center text-sm" style={{ lineHeight: theme.height.titlebar }}>
        {pageTitle}
      </span>
      <div className="w-fit-content grid grid-cols-3 justify-self-end">
        <Button className="hover:bg-black/10" title="Minimize" icon={<Subtract16Regular />} onClick={() => ipcRenderer.send("minimize")} />
        <Button
          className={`hover:bg-black/10 disabled:text-black/30 ${!isMaximizedEnabled && "pointer-events-none"}`}
          title={!isMaximized ? "Maximize" : "Minimize"}
          icon={!isMaximized ? <Maximize16Regular /> : <Restore16Regular />}
          onClick={() => {
            ipcRenderer.send("switch-maximize-unmaximize");
            setIsMaximized((isMaximized) => !isMaximized);
          }}
          disabled={!isMaximizedEnabled}
        />
        <Button className="hover:bg-red-500 hover:text-white" title="Close" icon={<Dismiss16Regular />} onClick={() => ipcRenderer.send("close")} />
      </div>
    </div>
  );
}
