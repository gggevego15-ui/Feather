const { app, BrowserWindow, shell } = require("electron");
const path = require("node:path");

let mainWindow;
const isFeatherLink = value => typeof value === "string" && value.startsWith("feather://auth");

function handleDeepLink(url) {
  if (!isFeatherLink(url)) return;
  const dispatch = () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.executeJavaScript(
        "window.dispatchEvent(new CustomEvent('feather:auth-callback', { detail: " + JSON.stringify(url) + " }))"
      ).catch(() => {});
    }
  };
  if (mainWindow?.webContents.isLoading()) mainWindow.webContents.once("did-finish-load", dispatch);
  else dispatch();
}

if (process.defaultApp && process.argv.length >= 2) {
  app.setAsDefaultProtocolClient("feather", process.execPath, [path.resolve(process.argv[1])]);
} else {
  app.setAsDefaultProtocolClient("feather");
}

app.on("open-url", (event, url) => {
  event.preventDefault();
  handleDeepLink(url);
});

app.on("second-instance", (_event, argv) => {
  const deepLink = argv.find(isFeatherLink);
  if (deepLink) handleDeepLink(deepLink);
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 780,
    minWidth: 360,
    minHeight: 560,
    title: "Feather Messenger",
    backgroundColor: "#0b0e14",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, "..", "www", "index.html"));
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://")) shell.openExternal(url);
    return { action: "deny" };
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
  mainWindow.webContents.once("did-finish-load", () => {
    const initialLink = process.argv.find(isFeatherLink);
    if (initialLink) handleDeepLink(initialLink);
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
