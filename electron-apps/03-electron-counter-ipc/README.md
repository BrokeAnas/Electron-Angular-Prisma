# electron-counter-ipc — Compteur persistant avec IPC (v2)

Compteur complet avec IPC structuré et persistance sur disque.
La valeur est sauvegardée dans un fichier JSON dans le `userData` d'Electron — elle survit au redémarrage de l'app.

## Concept pédagogique

- IPC multi-canaux : `counterService:add`, `counterService:subtract`, `counterService:reset`, `counterService:get`
- Persistance avec `fs.writeFileSync` dans `app.getPath('userData')`
- Séparation des responsabilités : main process = logique + données, renderer = affichage
- Fermeture propre via `app:quit`

## Structure

```
electron-counter-ipc/
├── main.js              ← handlers IPC + lecture/écriture JSON
├── preload.js           ← expose window.counterService au renderer
├── renderer/
│   └── tp.html          ← interface avec boutons +, -, reset, quitter
└── package.json
```

## Lancer l'app

```bash
npm install
npm start
```

> Prérequis : Node.js 18+ (pour `fetch` natif)
