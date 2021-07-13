import { app } from "electron";
import serve from "electron-serve";
import config from "../config";
import "../types";

/**
 * Initialize libraries and setup Electron
 *
 * @function
 */
export default () => {
  if (config.SERVER.ENV === "production") serve({ directory: "app" });
  else app.setPath("userData", `${app.getPath("userData")} (development)`);
};
