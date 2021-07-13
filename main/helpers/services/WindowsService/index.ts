import { BrowserWindow } from "electron";
import createWindow from "./createWindow";
import config from "../../config";

/**
 * Create and/or get a window already created.
 *
 * @class
 */
export default class WindowsService {
  static _windows = {
    MAIN_WINDOW: <BrowserWindow | null>null,
    GOOGLE_AUTH_WINDOW: <BrowserWindow | null>null,
  };

  /**
   * Create and/or get "main" window.
   *
   * @returns new (or already created) BrowserWindow
   * @static
   */
  static getMainWindow() {
    return (this._windows.MAIN_WINDOW = this._windows.MAIN_WINDOW || createWindow("main", config.__ELECTRON.WindowOptions).loadListeners("MAIN_WINDOW"));
  }

  /**
   * Create and/or get "googleAuth" window.
   *
   * @returns new (or already created) BrowserWindow
   * @static
   */
  static getGoogleAuthWindow() {
    return (this._windows.GOOGLE_AUTH_WINDOW =
      this._windows.GOOGLE_AUTH_WINDOW ||
      createWindow("googleAuth", {
        ...config.__ELECTRON.WindowOptions,
        width: 450,
        height: 600,
        show: true,
        modal: true,
        parent: this.getMainWindow(),
        webPreferences: { webviewTag: true },
      })).loadListeners("GOOGLE_AUTH_WINDOW");
  }

  /**
   * Remove `window` from WindowsService
   *
   * @param window - `AllWindowsType` string
   * @static
   */
  static resetWindow(window: AllWindowsType) {
    this._windows[window] = null;
  }
}

/**
 * All windows that can be created with `WindowsService`
 *
 * @type string
 */
export type AllWindowsType = keyof typeof WindowsService._windows;
