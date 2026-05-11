# Electron Apps — Cours guidé

Série de mini-applications Electron construites progressivement pour apprendre les concepts fondamentaux du framework.

## Structure du dépôt

```
electron-apps/
├── 01-electron-show/          ← Fenêtre plein écran, version minimale
├── 02-electron-counter-avant/ ← Compteur avec IPC (introduction)
├── 03-electron-counter-ipc/   ← Compteur persistant avec IPC structuré
├── 04-electron-system-command/← Exécution de commandes système
├── 05-electron-api/           ← Appel d'API externe (météo)
└── 06-electron-all/           ← Exemple complet avec plusieurs preloads
```

## Progression pédagogique

| # | Projet | Concepts clés |
|---|--------|---------------|
| 01 | `electron-show` | `BrowserWindow`, options fenêtre, sans preload |
| 02 | `electron-counter-avant` | IPC basique, `contextIsolation`, `preload.js` |
| 03 | `electron-counter-ipc` | IPC multi-canaux, persistance fichier JSON |
| 04 | `electron-system-command` | Exécution de commandes système depuis le main process |
| 05 | `electron-api` | Requêtes réseau côté main, géocodage, gestion d'erreurs |
| 06 | `electron-all` | Architecture complète, plusieurs fichiers preload |

## Lancer un projet

Chaque projet est indépendant. Pour en lancer un :

```bash
cd 01-electron-show   # ou n'importe quel autre dossier
npm install
npm start
```

> Prérequis : Node.js 18+
# Electron-Angular-Prisma
