import { BrowserWindow } from "electron";
import load from "../../services/WindowsService/listeners";

BrowserWindow.prototype.customLoadURL = function (string, options) {
  return new Promise((resolve, reject) =>
    this.loadURL(string, options)
      .then(() => resolve(this))
      .catch((err) => reject(err))
  );
};

BrowserWindow.prototype.loadListeners = function (window) {
  load.settings(this);

  switch (window) {
    case "MAIN_WINDOW": {
      load.common();
      load.mainWindow(this);
      break;
    }

    case "GOOGLE_AUTH_WINDOW": {
      load.googleAuthWindow(this);
      break;
    }
  }

  return this;
};
