import { Menu, shell } from "electron";

const isMac = process.platform === "darwin";
const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [{ role: "undo" }, { role: "redo" }, { type: "separator" }, { role: "cut" }, { role: "copy" }, { role: "paste" }],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [{ role: "minimize" }, { role: "zoom" }],
  },
  {
    role: "help",
    submenu: [{ label: "Learn More", click: async () => await shell.openExternal("https://electronjs.org") }],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
export default menu;
