const {contextBridge, ipcRenderer} = require('electron');

// ─────────────────────────────────────────────────────────────
// contextBridge.exposeInMainWorld(nom, objet)
//
// Rend `objet` accessible dans le renderer via `window.nom`.
// Le renderer ne voit JAMAIS ipcRenderer directement :
// il ne peut appeler que les méthodes qu'on expose ici.
// C'est le sas de sécurité entre le renderer et le main.
// ─────────────────────────────────────────────────────────────

// Namespace pour les opérations sur le compteur → window.counterService
// Chaque méthode envoie une commande au main et retourne la valeur mise à jour
contextBridge.exposeInMainWorld('counterService', {
    add:      () => ipcRenderer.invoke('counter:add'),
    subtract: () => ipcRenderer.invoke('counter:subtract'),
    get:      () => ipcRenderer.invoke('counter:get'),
    reset:    () => ipcRenderer.invoke('counter:reset'),
    quit:     () => ipcRenderer.invoke('app:quit'),
});