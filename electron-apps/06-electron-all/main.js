const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { execSync } = require('child_process');

const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';


// ─────────────────────────────────────────────────────────────
// COMPTEUR
// ─────────────────────────────────────────────────────────────
let count = 0;

ipcMain.handle('counter:add', () => ++count);
ipcMain.handle('counter:subtract', () => --count);
ipcMain.handle('counter:reset', () => { count = 0; return count; });
ipcMain.handle('counter:get', () => count);


// ─────────────────────────────────────────────────────────────
// COMMANDES SYSTÈME
// ─────────────────────────────────────────────────────────────
function run(cmd) {
  return execSync(cmd).toString().trim();
}

ipcMain.handle('system:hostname', () => run('hostname'));

ipcMain.handle('system:username', () => {
  if (isWindows) return run('powershell -Command "[System.Environment]::UserName"');
  return run('whoami');
});

ipcMain.handle('system:diskSpace', () => {
  if (isWindows) return run('powershell -Command "Get-PSDrive C | Select-Object Used,Free"');
  return run('df -h /');
});

ipcMain.handle('system:openTerminal', () => {
  if (isWindows) run('start cmd');
  else if (isMac) run('open -a Terminal');
  else run('xterm &');
  return 'Terminal ouvert.';
});

ipcMain.handle('system:getOS', () => {
  if (isWindows) return 'Windows';
  if (isMac) return 'macOS';
  return 'Linux';
});


// ─────────────────────────────────────────────────────────────
// API MÉTÉO
// ─────────────────────────────────────────────────────────────
ipcMain.handle('api:meteo', async (_event, ville) => {
  const geoReponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${ville}&count=1&language=fr`
  );
  const geoData = await geoReponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`Ville introuvable : "${ville}"`);
  }

  const { latitude, longitude } = geoData.results[0];

  const meteoReponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  const meteoData = await meteoReponse.json();
  return meteoData.current_weather;
});


// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
ipcMain.handle('app:quit', () => app.quit());

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // Sur macOS, les apps restent actives même sans fenêtre ouverte
  // Sur Windows/Linux, on quitte complètement
  if (process.platform !== 'darwin') app.quit();
});

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,   // nécessaire pour que le preload puisse require() des fichiers locaux
    }
  });

  win.loadFile('renderer/tp.html');
  // win.webContents.openDevTools();
}
