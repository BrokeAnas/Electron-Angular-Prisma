const { contextBridge, ipcRenderer } = require('electron');

// ─────────────────────────────────────────────────────────────
// contextBridge.exposeInMainWorld(nom, objet)
//
// Rend `objet` accessible dans le renderer via `window.nom`.
// Le renderer ne touche jamais ipcRenderer directement.
// ─────────────────────────────────────────────────────────────

// Namespace pour les commandes système → window.systemService
contextBridge.exposeInMainWorld('systemService', {
  hostname:     () => ipcRenderer.invoke('system:hostname'),
  username:     () => ipcRenderer.invoke('system:username'),
  listDesktop:  () => ipcRenderer.invoke('system:listDesktop'),
  diskSpace:    () => ipcRenderer.invoke('system:diskSpace'),
  openTerminal: () => ipcRenderer.invoke('system:openTerminal'),
  getOS:        () => ipcRenderer.invoke('system:getOS'),
  quit:         () => ipcRenderer.invoke('app:quit'),
});
