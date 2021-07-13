import { app, ipcMain } from "electron";
import { loaders, WindowsService } from "./helpers";

loaders();

app
  .once("ready", () => WindowsService.getMainWindow())
  .once("window-all-closed", () => {
    ipcMain.removeAllListeners();
    app.removeAllListeners();
    app.quit();
  });
