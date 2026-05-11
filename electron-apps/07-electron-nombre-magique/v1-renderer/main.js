// V1 — main.js
// Rôle unique : créer la fenêtre.
// Aucun ipcMain ici — toute la logique est dans le renderer.

const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  })

  win.loadFile('renderer/index.html'),
    win.webContents.openDevTools()
}

app.whenReady().then(createWindow)
