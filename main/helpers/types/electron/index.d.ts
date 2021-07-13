import { Voicemail20Filled } from "@fluentui/react-icons";
import { AllWindowsType } from "../..";

declare global {
  namespace Electron {
    interface BrowserWindow {
      /**
       * Load and init `BrowserWindow` and `ipcMain` listeners
       *
       * @param window `AllWindowsType` (string)
       * @return `BrowserWindow`
       * @method
       */
      loadListeners(this: BrowserWindow, window: AllWindowsType): this;

      /**
       * A custom `loadURL()` implementation. This can be used to chain code.
       *
       * _Original documentation about the method:_
       * > the promise will resolve when the page has finished loading (see did-finish-load), and rejects if the page fails to load (see did-fail-load).
       * > Same as webContents.loadURL(url[, options]).
       * > The url can be a remote address (e.g. http://) or a path to a local HTML file using the file:// protocol.
       * > To ensure that file URLs are properly formatted, it is recommended to use Node's url.format method:
       * > You can load a URL using a POST request with URL-encoded data by doing the following:
       *
       * @param url string
       * @param options _(optional)_ Electron.LoadURLOptions
       * @return `BrowserWindow`
       * @method
       */
      customLoadURL(this: BrowserWindow, url: string, options?: LoadURLOptions): Promise<this>;
    }
  }
}
