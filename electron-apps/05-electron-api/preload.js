const { contextBridge, ipcRenderer } = require('electron');

// ─────────────────────────────────────────────────────────────
// contextBridge.exposeInMainWorld(nom, objet)
//
// Rend `objet` accessible dans le renderer via `window.nom`.
// Le renderer ne voit JAMAIS ipcRenderer directement :
// il ne peut appeler que les méthodes qu'on expose ici.
// C'est le sas de sécurité entre le renderer et le main.
// ─────────────────────────────────────────────────────────────

// Namespace pour les appels API externes → window.api
// getMeteo(ville) envoie la ville au main et attend les données météo
contextBridge.exposeInMainWorld('api', {
    getMeteo: (ville) => ipcRenderer.invoke('api:meteo', ville),
});
