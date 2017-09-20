const electron = require('electron')
const imagerElectron = require("./src/imager-electron/imager-electron.js");

// Module to control application life.
const app = electron.app
const ipcMain = electron.ipcMain;

imagerElectron.ipc = ipcMain;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
electron.app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
});
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 768, titleBarStyle: "hiddenInset"})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/sites/main.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.ie = require("./src/imager-electron/imager-electron.js");


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  imagerElectron.mainWindow = mainWindow;
  //imagerElectron.test("");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // if (process.platform !== 'darwin') {
        app.quit()
    // }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})


ipcMain.on('imager-api-async', imagerElectron.apiAsync);

// Listen for sync message from renderer process
ipcMain.on('imager-api-sync', imagerElectron.apiSync);


