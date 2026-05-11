# electron-api — Appel d'API externe (Météo)

App Electron qui interroge une API météo publique depuis le **main process**
et affiche les résultats dans le renderer via IPC.

## Concept pédagogique

- Le renderer ne fait **jamais** de requêtes réseau directement
- Le main process agit comme un backend sécurisé (`ipcMain.handle('api:meteo', ...)`)
- Géocodage en deux étapes : nom de ville → coordonnées GPS → données météo
- `fetch` natif Node.js 18+ sans librairie tierce
- Gestion d'erreurs IPC (`throw new Error(...)` côté main, try/catch côté renderer)

## APIs utilisées

- [open-meteo.com](https://open-meteo.com) — météo gratuite, sans clé API

## Structure

```
electron-api/
├── main.js              ← géocodage + requête météo via fetch
├── preload.js           ← expose window.api.getMeteo(ville)
├── renderer/
│   ├── tp.html          ← champ de saisie + affichage météo
│   ├── css/
│   └── js/
└── package.json
```

## Lancer l'app

```bash
npm install
npm start
```

> Prérequis : Node.js 18+ et connexion internet
