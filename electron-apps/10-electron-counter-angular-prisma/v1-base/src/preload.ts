import { contextBridge, ipcRenderer } from 'electron';

// contextBridge.exposeInMainWorld crée un "pont sécurisé" :
// il place l'objet 'api' sur window.api dans le Renderer.
// Angular peut alors appeler window.api.increment() etc.
// sans jamais avoir accès directement à Node.js.

contextBridge.exposeInMainWorld('api', {
    getCounter: (): Promise<number> => ipcRenderer.invoke('get-counter'),
    increment:  (): Promise<number> => ipcRenderer.invoke('increment'),
    decrement:  (): Promise<number> => ipcRenderer.invoke('decrement'),
    reset:      (): Promise<number> => ipcRenderer.invoke('reset'),
});
