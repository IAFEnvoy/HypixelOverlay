const { app, BrowserWindow, globalShortcut } = require('electron');
let win;
const windowConfig = {
  width: 800,
  height: 600,
  frame: false,
  transparent: true,
  useContentSize: true,
  maximizable: false,
  minimizable: true,
  x: 40,
  y: 20,
  minWidth: 400,
  icon: __dirname + '/assets/logo.ico',
  alwaysOnTop: true,
  title: 'Hypixel Overlay',
  // focusable: false,
  skipTaskbar: false,
  hasShadow: true,
  webPreferences: { nodeIntegration: true, enableRemoteModule: true, contextIsolation: false }
};

const createWindow = () => {
  win = new BrowserWindow(windowConfig);
  win.loadFile('src/index.html');
  // win.webContents.openDevTools();
  win.on('close', () => { win = null; });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length == null)
    createWindow();
})