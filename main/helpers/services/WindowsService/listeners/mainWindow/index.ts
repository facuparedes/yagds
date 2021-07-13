import { BrowserWindow, ipcMain } from "electron";
import { WindowsService } from "../../..";
import generateUrl from "../generateUrl";

/**
 * Start listening `BrowserWindow` and `ipcMain` events
 *
 * @param mainWindow `BrowserWindow`
 * @function
 */
export default (mainWindow: BrowserWindow) => {
  ipcMain.on("openGoogleAuthWindow", () => WindowsService.getGoogleAuthWindow());

  mainWindow
    .once("ready-to-show", () => mainWindow.show())
    .once("close", () => mainWindow.destroy())
    .once("closed", () => {
      WindowsService.resetWindow("MAIN_WINDOW");
      ipcMain.removeAllListeners("openGoogleAuthWindow");
    })
    .customLoadURL(generateUrl("home"))
    .catch((err) => console.error("Error:", err));
};

// {
//   const refreshToken = await e.sender.session.cookies.get({ name: "token" });
//   if (refreshToken) {
//     oAuth2Client.setCredentials({ refresh_token: refreshToken[0].value });
//     await oAuth2Client
//       .getRequestHeaders()
//       .then(() => {
//         console.log("Still Loggedin");
//         e.reply("isLoggedIn", true);
//       })
//       .catch(() => {
//         console.log("Error signout");
//         e.reply("isLoggedIn", false);
//       });
//   } else e.reply("isLoggedIn", false);
// }
