# electron-show — Fenêtre plein écran

App Electron qui ouvre une fenêtre en plein écran affichant une page HTML.
Pas de preload, pas d'IPC — version la plus simple possible.

## Concept pédagogique

- Options de `BrowserWindow` : `fullscreen`, `width`, `height`
- Différence entre une app avec et sans preload/contextIsolation

## Structure

```
electron-show/
├── main.js              ← main process, fenêtre fullscreen
├── renderer/
│   └── index.html       ← interface affichée
└── package.json
```

## Lancer l'app

```bash
npm install
npm start
```

> Prérequis : Node.js installé
