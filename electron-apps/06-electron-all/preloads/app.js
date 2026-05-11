const { contextBridge, ipcRenderer } = require('electron');

// ─────────────────────────────────────────────────────────────
// Preload dédié à l'app → window.appService
// ─────────────────────────────────────────────────────────────
contextBridge.exposeInMainWorld('appService', {
  quit: () => ipcRenderer.invoke('app:quit'),
});
