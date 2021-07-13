import { BrowserWindowConstructorOptions } from "electron";

export default {
  SERVER: {
    ENV: process.env.NODE_ENV || "development",
    OAUTH_CLIENTID: process.env.OAUTH_CLIENTID || "exampleexampleexampleexampleexampleexample.apps.googleusercontent.com",
  },
  __ELECTRON: {
    WindowOptions: <BrowserWindowConstructorOptions>{
      width: 1000,
      height: 600,
      show: false,
      frame: false,
      // resizable: false,
      maximizable: false,
      fullscreenable: false,
      autoHideMenuBar: true,
      webPreferences: { enableWebSQL: false },
    },
  },
};
