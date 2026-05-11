const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  win.loadFile('renderer/tp.html');
  win.webContents.openDevTools();

};


//IPC handlers
let count = 0;

// { count++; return count;}
ipcMain.handle('counter:add', () => ++count);


app.whenReady().then(createWindow);