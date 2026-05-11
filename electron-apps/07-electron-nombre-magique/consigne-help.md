---
marp: true
---


## Rappels techniques

---


### Preload attendu

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('guessService', {
  start:  ()       => ipcRenderer.invoke('guess:start'),
  check:  (nombre) => ipcRenderer.invoke('guess:check', nombre),
  save:   (nom, essais) => ipcRenderer.invoke('score:save', nom, essais),
  scores: ()       => ipcRenderer.invoke('score:getAll'),
})
```

---

### Ne jamais faire (version 2)

```js
// INTERDIT dans le renderer ou preload
const fs = require('fs')       // Node.js n'est pas accessible dans le renderer
window.secret = 42             // Ne pas exposer des données sensibles via le preload
nodeIntegration: true          // Ne jamais faire ça
contextIsolation: false        // Ne jamais faire ça
```

---

### Structure d'un handler IPC correct

```js
// main.js
ipcMain.handle('guess:check', (event, nombre) => {
  if (nombre > secret) return { resultat: 'trop_grand', essais: attempts }
  if (nombre < secret) return { resultat: 'trop_petit', essais: attempts }
  return { resultat: 'gagne', essais: attempts }
})
```

```js
// renderer/app.js
const result = await window.guessService.check(parseInt(input.value))
if (result.resultat === 'gagne') {
  // afficher victoire
}
```