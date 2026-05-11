const { contextBridge, ipcRenderer } = require('electron');

// ─────────────────────────────────────────────────────────────
// Preload dédié aux commandes système → window.systemService
// ─────────────────────────────────────────────────────────────
contextBridge.exposeInMainWorld('systemService', {
  hostname:     () => ipcRenderer.invoke('system:hostname'),
  username:     () => ipcRenderer.invoke('system:username'),
  diskSpace:    () => ipcRenderer.invoke('system:diskSpace'),
  openTerminal: () => ipcRenderer.invoke('system:openTerminal'),
  getOS:        () => ipcRenderer.invoke('system:getOS'),
});
