const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('counter', {
    add: () => ipcRenderer.invoke('counter:add'),
});

