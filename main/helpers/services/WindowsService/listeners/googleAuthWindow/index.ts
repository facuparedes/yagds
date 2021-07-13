import { BrowserWindow, ipcMain, shell } from "electron";
import { WindowsService, AuthService } from "../../..";
import generateUrl from "../generateUrl";
import formatUserAgent from "./formatUserAgent";

/**
 * Start listening `BrowserWindow` and `ipcMain` events
 *
 * @param googleAuthWindow `BrowserWindow`
 * @function
 */
export default (googleAuthWindow: BrowserWindow) => {
  const parentWindow = googleAuthWindow.getParentWindow();

  ipcMain.once("getAuthUrl", (e) => e.reply("getAuthUrl", { url: AuthService.authUrl, userAgent: formatUserAgent(e.sender.userAgent) }));

  googleAuthWindow
    .once("ready-to-show", () => googleAuthWindow.show())
    .once("close", () => {
      parentWindow.setAlwaysOnTop(true);
      googleAuthWindow.destroy();
    })
    .once("closed", () => {
      parentWindow.setAlwaysOnTop(false);
      WindowsService.resetWindow("GOOGLE_AUTH_WINDOW");
      ipcMain.removeAllListeners("getAuthUrl");
    })
    .customLoadURL(generateUrl("googleAuth"))
    .then((it) =>
      it.webContents.once("did-attach-webview", (_, webview) =>
        webview
          .on("will-navigate", (_, url) => extractCredentials(it, url))
          .on("will-redirect", (_, url) => extractCredentials(it, url))
          .setWindowOpenHandler(({ url }) => shell.openExternal(url) && { action: "deny" })
      )
    )
    .catch((err) => console.log("Error:", err));
};

/**
 * Extract `code` from google auth url.
 * If authorization is completed or it is canceled, `googleAuthWindow` will be closed.
 *
 * @param googleAuthWindow BrowserWindow
 * @param url string
 */
const extractCredentials = (googleAuthWindow: BrowserWindow, url: string) => {
  const { pathname, searchParams } = new URL(url);

  if (!pathname.includes("oauth")) {
    googleAuthWindow.close();
    const code = searchParams.get("code");

    if (code) AuthService.getAccessToken(code);
  }
};
