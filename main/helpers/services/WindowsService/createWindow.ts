import { screen, BrowserWindowConstructorOptions, BrowserWindow } from "electron";
import Store from "electron-store";

interface SizeInterface {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const ensureVisibleOnSomeDisplay = (windowState: Electron.Rectangle, defaultSize: SizeInterface) => {
  const visible = screen.getAllDisplays().some((display) => windowWithinBounds(windowState, display.bounds));

  // If window is partially or fully not visible,
  // reset it to safe defaults.
  if (!visible) return resetToDefaults(defaultSize);
  return windowState;
};

const restore = (store: Store, key: string, defaultSize: SizeInterface) => store.get(key, defaultSize) as Electron.Rectangle;

const windowWithinBounds = (windowState: Electron.Rectangle, bounds: Electron.Rectangle) =>
  windowState.x >= bounds.x && windowState.y >= bounds.y && windowState.x + windowState.width <= bounds.x + bounds.width && windowState.y + windowState.height <= bounds.y + bounds.height;

const resetToDefaults = (defaultSize: SizeInterface) => {
  const bounds = screen.getPrimaryDisplay().bounds;

  return Object.assign({}, defaultSize, {
    x: (bounds.width - defaultSize.width) / 2,
    y: (bounds.height - defaultSize.height) / 2,
  });
};

const getCurrentPosition = (win: BrowserWindow): Electron.Rectangle => {
  const position = win.getPosition();
  const size = win.getSize();

  return {
    x: position[0],
    y: position[1],
    width: size[0],
    height: size[1],
  };
};

const saveState = (win: BrowserWindow, store: Store, key: string, state: SizeInterface) => {
  if (win.isNormal()) Object.assign(state, getCurrentPosition(win));
  store.set(key, state);
};

export default (windowName: string, options: BrowserWindowConstructorOptions): BrowserWindow => {
  const key = "window-state";
  const name = `${key}-${windowName}`;
  const store = new Store({ name });
  const defaultSize = { width: options.width, height: options.height };

  const newWindow = new BrowserWindow({
    ...ensureVisibleOnSomeDisplay(restore(store, key, defaultSize), defaultSize),
    ...options,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      ...options.webPreferences,
    },
  }).once("close", () => saveState(newWindow, store, key, defaultSize));

  return newWindow;
};
