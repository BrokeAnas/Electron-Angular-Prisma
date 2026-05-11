// V2 — main.js
// Rôle : créer la fenêtre + traiter TOUTE la logique de jeu via IPC.
// Le renderer ne fait qu'afficher — il ne connaît jamais le nombre secret.

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs   = require('fs')

// Fichier de persistance des scores (écrit sur le disque par Node.js)
const SCORES_FILE = path.join(__dirname, 'scores.json')

// -------------------------------------------------------
// État du jeu — côté main, inaccessible depuis le renderer
// -------------------------------------------------------
let secret   = 0
let attempts = 0

// -------------------------------------------------------
// Persistance des scores avec fs (module Node.js)
// -------------------------------------------------------
function loadScores() {
  if (!fs.existsSync(SCORES_FILE)) return []
  const raw = fs.readFileSync(SCORES_FILE, 'utf-8')
  return JSON.parse(raw)
}

function saveScores(scores) {
  fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2))
}

// -------------------------------------------------------
// Fenêtre
// -------------------------------------------------------
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  })

  win.loadFile('renderer/index.html')
}

// -------------------------------------------------------
// Handlers IPC — convention : entité:action
// -------------------------------------------------------

// Démarre une nouvelle partie : génère un nouveau nombre secret dans le main
ipcMain.handle('guess:start', () => {
  secret   = Math.floor(Math.random() * 100) + 1
  attempts = 0
  console.log('[main] Nouvelle partie. Secret =', secret) // visible dans le terminal, pas dans le renderer
  return { started: true }
})

// Reçoit un nombre du renderer, le compare au secret, retourne le résultat
ipcMain.handle('guess:check', (event, nombre) => {
  attempts++

  if (nombre > secret) return { resultat: 'trop_grand', essais: attempts }
  if (nombre < secret) return { resultat: 'trop_petit', essais: attempts }

  // Gagné
  return { resultat: 'gagne', essais: attempts }
})

// Sauvegarde un score dans le fichier JSON
ipcMain.handle('score:save', (event, nom, essais) => {
  const scores = loadScores()
  scores.push({ nom, essais, date: new Date().toLocaleDateString('fr-BE') })
  scores.sort((a, b) => a.essais - b.essais)
  saveScores(scores.slice(0, 5))   // on garde les 5 meilleurs
  return true
})

// Retourne les scores depuis le fichier JSON
ipcMain.handle('score:getAll', () => {
  return loadScores()
})

// -------------------------------------------------------
app.whenReady().then(createWindow)
