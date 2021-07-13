import { BrowserWindow, ipcMain, WebContents } from "electron";
import { WindowsService, InternetConnectionService, AuthService } from "../../..";
import menu from "./titlebarMenu";
import config from "../../../../config";

/**
 * Start and set common `ipcMain` events.
 *
 * @function
 */
export default () => {
  InternetConnectionService.on("statusChanged", (status, retryingCountdown) => WindowsService._windows.MAIN_WINDOW?.webContents.send("onlineStatus", status, retryingCountdown));

  ipcMain
    .on("display-app-menu", ({ sender }, args) => config.SERVER.ENV === "development" && process.platform === "win32" && menu.popup({ window: getWindow(sender), x: args.x, y: args.y }))
    .on("minimize", ({ sender }) => getWindow(sender)?.minimize())
    .on("isMaximizedEnabled", (e) => e.reply("isMaximizedEnabled", getWindow(e.sender)?.isMaximizable()))
    .on("isMaximized", (e) => e.reply("isMaximized", getWindow(e.sender)?.isMaximized()))
    .on("switch-maximize-unmaximize", ({ sender }) => {
      const window = getWindow(sender);

      return !window?.isMaximized() ? window?.maximize() : window?.unmaximize();
    })
    .on("close", ({ sender }) => getWindow(sender)?.close())
    .on("onlineStatus", (e) => e.reply("onlineStatus", InternetConnectionService.status))
    .on("isLoggedIn", async (e) => e.reply("isLoggedIn", await AuthService.isLoggedIn()));
};

/**
 * Find and get `BrowserWindow` from `sender` (WebContents)
 *
 * @param sender WebContents
 * @returns BrowserWindow
 */
const getWindow = (sender: WebContents) => BrowserWindow.fromWebContents(sender);
