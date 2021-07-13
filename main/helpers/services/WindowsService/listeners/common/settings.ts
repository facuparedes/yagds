import { BrowserWindow } from "electron";

/**
 * Set and/or change parameters to `window`.
 * _(It is used because Electron has a bug with Resizable. See #30024 on github.com/electron/electron)_
 *
 * @param window BrowserWindow
 */
export default (window: BrowserWindow) => window.setResizable(false);
