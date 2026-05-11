# electron-counter-avant — Compteur avec IPC (v1)

Compteur simple avec communication IPC entre le renderer et le main process.
Le compteur vit dans le main process, le renderer envoie des commandes via `ipcMain.handle`.

## Concept pédagogique

- Introduction à l'IPC : `ipcMain.handle` côté main, `ipcRenderer.invoke` côté renderer
- Sécurité : `contextIsolation: true`, `nodeIntegration: false`
- Rôle du `preload.js` comme pont entre renderer et main

## Structure

```
electron-counter-avant/
├── main.js              ← main process + handler IPC counter:add
├── preload.js           ← expose window.electronAPI au renderer
├── renderer/
│   └── tp.html          ← bouton + affichage du compteur
└── package.json
```

## Lancer l'app

```bash
npm install
npm start
```

> Prérequis : Node.js installé
