import { screen, BrowserWindowConstructorOptions } from "electron";
import { BrowserWindow } from "glasstron";
import Store from "electron-store";

export default (windowName: string, options: BrowserWindowConstructorOptions): BrowserWindow => {
  const key = "window-state";
  const name = `window-state-${windowName}`;
  const store = new Store({ name });
  const defaultSize = { width: options.width, height: options.height };
  let state = {};
  let win: BrowserWindow;

  const restore = () => store.get(key, defaultSize) as Electron.Rectangle;

  const getCurrentPosition = (): Electron.Rectangle => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    };
  };

  const windowWithinBounds = (windowState: Electron.Rectangle, bounds: Electron.Rectangle) =>
    windowState.x >= bounds.x && windowState.y >= bounds.y && windowState.x + windowState.width <= bounds.x + bounds.width && windowState.y + windowState.height <= bounds.y + bounds.height;

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState: Electron.Rectangle) => {
    const visible = screen.getAllDisplays().some((display) => windowWithinBounds(windowState, display.bounds));

    // If window is partially or fully not visible,
    // reset it to safe defaults.
    if (!visible) return resetToDefaults();
    return windowState;
  };

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) Object.assign(state, getCurrentPosition());
    store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore());

  const browserOptions: BrowserWindowConstructorOptions = {
    ...state,
    ...options,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      ...options.webPreferences,
    },
  };
  win = new BrowserWindow(browserOptions);
  win.blurType = "blurbehind";
  win.setBlur(true);

  win.on("close", saveState);

  return win;
};
