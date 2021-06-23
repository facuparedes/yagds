import { app, BrowserWindow, ipcMain } from "electron";
import { createWindow, initSetup } from "./helpers";
import config from "./config";

initSetup();

app
  .once("ready", () =>
    setTimeout(
      async () => {
        const mainWindow: BrowserWindow = createWindow("main", {
          width: 1000,
          height: 600,
          show: false,
          frame: false,
          resizable: false,
          maximizable: false,
          fullscreenable: false,
          webPreferences: { enableRemoteModule: true },
        });

        await mainWindow.once("ready-to-show", () => mainWindow.show()).loadURL(config.SERVER.ENV === "production" ? "app://./home.html" : `http://localhost:${process.argv[2]}/home`);

        // mainWindow.webContents.openDevTools();

        ipcMain
          .on("isMaximizedEnabled", (e) => (e.returnValue = mainWindow.isMaximizable()))
          .on("isMaximized", (e) => (e.returnValue = mainWindow.isMaximized()))
          .on("switch-maximize-unmaximize", () => (!mainWindow.isMaximized() ? mainWindow.maximize() : mainWindow.unmaximize()))
          .on("close", () => mainWindow.close())
          .on("minimize", () => mainWindow.minimize());
      },
      process.platform == "linux" ? 1000 : 0
    )
  )
  .on("window-all-closed", () => app.quit());
