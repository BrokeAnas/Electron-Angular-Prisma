const { contextBridge, ipcRenderer } = require('electron');

// ─────────────────────────────────────────────────────────────
// Preload dédié aux appels API externes → window.api
// ─────────────────────────────────────────────────────────────
contextBridge.exposeInMainWorld('api', {
  getMeteo: (ville) => ipcRenderer.invoke('api:meteo', ville),
});
