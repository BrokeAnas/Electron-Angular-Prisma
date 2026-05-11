const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(app.getPath('userData'), 'data.json');


// ─────────────────────────────────────────────────────────────
// PERSISTANCE — Lecture / écriture du compteur sur disque
//
// DATA_FILE pointe vers le dossier userData d'Electron,
// un emplacement spécifique à l'OS pour les données utilisateur.
// ─────────────────────────────────────────────────────────────

// Lit la valeur sauvegardée. Si le fichier n'existe pas encore,
// on l'initialise à 0.
function readCount() {
  if (!fs.existsSync(DATA_FILE)) {
    writeCount(0);
    return 0;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')).count ?? 0;
}

// Écrit la valeur dans le fichier JSON et la log dans la console
function writeCount(value) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ count: value }));
  console.log(`Count updated: ${value}`);
}


// ─────────────────────────────────────────────────────────────
// HANDLERS IPC — Compteur persistant
//
// Le renderer appelle window.counterService.xxx() → preload →
// invoke('counter:xxx') → ces handlers.
//
// La valeur du compteur est gardée en mémoire dans `count`
// et persistée sur disque à chaque modification via writeCount().
// ─────────────────────────────────────────────────────────────
let count = readCount();

// Incrémente, décrémente, remet à zéro ou lit le compteur.
// Chaque handler retourne la valeur courante au renderer.
ipcMain.handle('counter:add',      () => { ++count;   writeCount(count); return count; });
ipcMain.handle('counter:subtract', () => { --count;   writeCount(count); return count; });
ipcMain.handle('counter:reset',    () => { count = 0; writeCount(count); return count; });
ipcMain.handle('counter:get',      () => count);

// Ferme l'application proprement depuis le renderer
ipcMain.handle('app:quit', () => app.quit());


// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // Sur macOS, les apps restent actives même sans fenêtre ouverte
  // Sur Windows/Linux, on quitte complètement
  if (process.platform !== 'darwin') app.quit();
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  win.loadFile('renderer/tp.html');
  // win.webContents.openDevTools();
}