---
marp: true
---

# Projet Electron — Devine le Nombre

## Contexte

Ce projet combine ce que vous avez vu dans deux cours :

- **Projet de developpement Web** (cours Kamal B) : javascript, manipulation du DOM, addEventListener, keydown, createElement, classList, Math.random…
- **Projet de developpement SGBD** (cours Nicolas W) : architecture Main / Renderer / Preload, contextBridge, IPC, persistance Node.js

L'objectif n'est pas juste de faire tourner une app — c'est de **comprendre pourquoi** Electron est structuré ainsi, et de le démontrer à travers deux versions du même projet.

---

## Le projet : "Devine le Nombre"

Une application desktop Electron dans laquelle :

1. L'application choisit un **nombre mystère** entre 1 et 100
2. L'utilisateur saisit un nombre dans un champ et appuie sur Entrée (ou clique sur un bouton)
3. L'application répond : **"Trop grand"**, **"Trop petit"** ou **"Bravo ! Trouvé en X essais"**
4. L'historique des tentatives s'affiche dynamiquement (ajout dans le DOM à chaque essai)
5. Un bouton "Nouvelle partie" permet de recommencer

---

### Ce que vous devez implémenter

- [ ] Saisie du nombre via un `<input>` avec gestion de la touche `Enter` (`keydown`)
- [ ] Affichage dynamique des tentatives (ajout d'éléments dans le DOM avec `createElement` / `appendChild`)
- [ ] Compteur d'essais affiché en temps réel
- [ ] Feedback visuel : colorer le message en rouge (trop grand/petit) ou vert (gagné) avec `classList`
- [ ] Bouton "Nouvelle partie" qui remet tout à zéro

---

## Version 1 — Sans IPC (`branche : v1-renderer`)

Dans cette version, **toute la logique se passe dans le renderer** (le fichier HTML ou un JS chargé dans le renderer).

### Règles

- Le nombre mystère est généré avec `Math.floor(Math.random() * 100) + 1` **dans le renderer**
- La comparaison est faite **dans le renderer**
- `main.js` ne fait que créer la fenêtre — aucun `ipcMain`
- Le `preload.js` n'expose rien (fichier vide ou commenté)


---

### Ce que ça prouve (et son problème)

Ouvrez les DevTools (F12) et tapez dans la console :

```js
secret   // ou le nom de votre variable
```

Vous voyez le nombre mystère. **N'importe qui peut tricher.** La logique est dans le renderer, donc accessible.

> C'est exactement le problème que la version 2 résout.

---

## Version 2 — Avec IPC (`branche : v2-ipc`)

Dans cette version, **toute la logique de jeu se passe dans le main process**. Le renderer ne fait qu'afficher et envoyer des inputs.

### Structure attendue

```
devine-le-nombre/
├── package.json
├── main.js           ← BrowserWindow + ipcMain.handle(...)
├── preload.js        ← contextBridge.exposeInMainWorld('guessService', {...})
└── renderer/
    ├── index.html
    └── app.js        ← addEventListener + await window.guessService.xxx()
```

---


### Canaux IPC à implémenter

| Canal              | Sens             | Description                                                      |
|--------------------|------------------|------------------------------------------------------------------|
| `guess:start`      | renderer → main  | Démarre une nouvelle partie (génère un nouveau nombre secret)    |
| `guess:check`      | renderer → main  | Envoie un nombre, reçoit `"trop_grand"`, `"trop_petit"` ou `"gagne"` + nb d'essais |
| `score:save`       | renderer → main  | Envoie le nom du joueur + nb d'essais, sauvegarde dans JSON      |
| `score:getAll`     | renderer → main  | Récupère les 5 meilleurs scores depuis le fichier JSON           |


---



### Ce que ça prouve

Ouvrez les DevTools et tapez :

```js
window.guessService   // vous voyez l'objet exposé
window.guessService.secret  // undefined — le secret n'est PAS accessible
```

Le nombre secret est une variable dans `main.js`. **Le renderer n'y a aucun accès.** C'est ça, le principe du Main process comme backend sécurisé.

---

### Bonus
- [ ] Ajout d'une limite d'essais (ex : 10 max) → game over si dépassé
- [ ] Difficulté sélectionnable (facile 1-50, difficile 1-500)

---

## Livraison

### GitHub
1. Créez un repo **public** ou **privé** nommé `devine-le-nombre`
2. Deux branches minimum (ou 2 projets) :
   - `v1-renderer` — version sans IPC
   - `v2-ipc` — version avec IPC
3. Chaque branche doit avoir un `README.md` minimal indiquant comment lancer l'app (`npm install` puis `npm start`)
4. **Ne commitez pas `node_modules/`** — vérifiez que votre `.gitignore` contient bien `node_modules/`

---

### Mail
Envoyez un mail à **[nicolas.wattiaux@hainaut-ea.be]** avec :
- **Objet** : `[Electron] Devine le Nombre — Prénom Nom`
- Le lien vers votre repo GitHub
- Une phrase sur ce que vous avez trouvé le plus difficile entre les deux versions

### Échéance

> **Dimanche 23h59**

---

