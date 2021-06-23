import { app } from "electron";
import serve from "electron-serve";
import config from "../config";

export default () => {
  if (config.SERVER.ENV === "production") serve({ directory: "app" });
  else app.setPath("userData", `${app.getPath("userData")} (development)`);

  app.commandLine.appendSwitch("enable-transparent-visuals");
};
