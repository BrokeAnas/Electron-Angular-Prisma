// V2 — preload.js
// Pont entre le renderer et le main.
// On expose UNIQUEMENT les méthodes nécessaires — rien de plus.
// Le renderer ne voit jamais ipcRenderer, jamais require, jamais fs.

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('guessService', {
  start:  ()            => ipcRenderer.invoke('guess:start'),
  check:  (nombre)      => ipcRenderer.invoke('guess:check', nombre),
  save:   (nom, essais) => ipcRenderer.invoke('score:save', nom, essais),
  scores: ()            => ipcRenderer.invoke('score:getAll'),
})
