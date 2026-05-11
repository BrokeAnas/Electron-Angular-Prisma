const { contextBridge, ipcRenderer } = require('electron');

// ─────────────────────────────────────────────────────────────
// Preload dédié au compteur → window.counterService
// ─────────────────────────────────────────────────────────────
contextBridge.exposeInMainWorld('counterService', {
  add:      () => ipcRenderer.invoke('counter:add'),
  subtract: () => ipcRenderer.invoke('counter:subtract'),
  reset:    () => ipcRenderer.invoke('counter:reset'),
  get:      () => ipcRenderer.invoke('counter:get'),
});
