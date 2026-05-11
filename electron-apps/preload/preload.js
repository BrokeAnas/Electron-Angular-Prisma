const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api'
, {
getCounter: (): Promise<number> => ipcRenderer.invoke('get-counter'),
increment: (): Promise<number> => ipcRenderer.invoke('increment'),
decrement: (): Promise<number> => ipcRenderer.invoke('decrement'),
reset: (): Promise<number> => ipcRenderer.invoke('reset'),
});