const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { execSync } = require('child_process');

// ─────────────────────────────────────────────────────────────
// UTILITAIRE — Détection de l'OS
//
// process.platform retourne :
//   'win32'  → Windows
//   'darwin' → macOS
//   'linux'  → Linux
// ─────────────────────────────────────────────────────────────
const isWindows = process.platform === 'win32';
const isMac     = process.platform === 'darwin';

function runCommand(command) {
  return execSync(command).toString().trim();
}


// ─────────────────────────────────────────────────────────────
// HANDLERS IPC — Commandes système
//
// Chaque handler correspond à une commande exposée au renderer.
// La logique OS est ici dans le main — le renderer ne sait pas
// sur quel système il tourne.
// ─────────────────────────────────────────────────────────────

// Nom de la machine
ipcMain.handle('system:hostname', () => {
  return runCommand('hostname');
});

// Utilisateur courant
ipcMain.handle('system:username', () => {
  if (isWindows) {
    return runCommand('powershell -Command "[System.Environment]::UserName"');
  }
  return runCommand('whoami');
});

// Liste des fichiers du bureau
ipcMain.handle('system:listDesktop', () => {
  if (isWindows) {
    return runCommand('dir "%USERPROFILE%\\Desktop"');
  }
  return runCommand('ls ~/Desktop');
});

// Espace disque disponible
ipcMain.handle('system:diskSpace', () => {
  if (isWindows) {
    return runCommand('powershell -Command "Get-PSDrive C | Select-Object Used,Free"');
  }
  return runCommand('df -h /');
});

// Ouvrir le terminal natif
ipcMain.handle('system:openTerminal', () => {
  if (isWindows) {
    runCommand('start cmd');
  } else if (isMac) {
    runCommand('open -a Terminal');
  } else {
    runCommand('xterm &');
  }
  return 'Terminal ouvert.';
});

// Retourne le nom de l'OS lisible
ipcMain.handle('system:getOS', () => {
  if (isWindows) return 'Windows';
  if (isMac)     return 'macOS';
  return 'Linux';
});

// Fermeture propre
ipcMain.handle('app:quit', () => app.quit());


// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
app.whenReady().then(createWindow);

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  win.loadFile('renderer/tp.html');
  // win.webContents.openDevTools();
}
