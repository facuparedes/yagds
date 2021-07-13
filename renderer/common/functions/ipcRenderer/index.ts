import { ipcRenderer, IpcRendererEvent } from "electron";

/**
 * This function is only available in render side, so it could't be implemented on a type extend definition (.d.ts file).
 * \
 * \
 * A custom `on()` implementation. This will start listening, if it has not been previously created.
 * This function was developed to avoid memory leaks.
 *
 * _Original documentation about the `ipcRenderer.on()` method:_
 * > Listens to channel, when a new message arrives listener would be called with listener(event, args...).
 *
 * @param channel string
 * @param listener Callback
 * @return `IpcRenderer`
 * @method
 */
export function ifNotExistOn(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
  if (!ipcRenderer.listenerCount(channel)) ipcRenderer.on(channel, listener);
  return ipcRenderer;
}

/**
 * This function is only available in render side, so it could't be implemented on a type extend definition (.d.ts file).
 * \
 * \
 * A custom `once()` implementation. This will start listening, if it has not been previously created.
 * This function was developed to avoid memory leaks.
 *
 * _Original documentation about the `ipcRenderer.once()` method:_
 * > Listens to channel, when a new message arrives listener would be called with listener(event, args...).
 *
 * @param channel string
 * @param listener Callback
 * @return `IpcRenderer`
 * @method
 */
export function ifNotExistOnce(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
  if (!ipcRenderer.listenerCount(channel)) ipcRenderer.once(channel, listener);
  return ipcRenderer;
}
