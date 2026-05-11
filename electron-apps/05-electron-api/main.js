const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// ─────────────────────────────────────────────────────────────
// HANDLER IPC — Météo
//
// Le renderer appelle window.api.getMeteo(ville) → preload →
// invoke('api:meteo', ville) → ce handler.
//
// Le handler reçoit deux paramètres :
//   _event : l'événement Electron (rarement utilisé, on l'ignore)
//   ville  : la chaîne envoyée par le renderer (ex: "Bruxelles")
//
// On utilise fetch (disponible nativement dans Node.js 18+)
// pour interroger deux APIs publiques d'open-meteo (sans clé API).
// ─────────────────────────────────────────────────────────────
ipcMain.handle('api:meteo', async (_event, ville) => {

  // --- Étape 1 : Géocodage ---
  // On convertit le nom de la ville en coordonnées GPS (latitude, longitude).
  // L'API retourne un tableau `results`, on prend le premier résultat.
  const geoReponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${ville}&count=1&language=fr`
  );
  const geoData = await geoReponse.json();

  // Si la ville n'est pas trouvée, `results` sera undefined → on lève une erreur
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`Ville introuvable : "${ville}"`);
  }

  // Déstructuration : on extrait latitude et longitude du premier résultat
  const { latitude, longitude } = geoData.results[0];

  // --- Étape 2 : Météo actuelle ---
  // On envoie les coordonnées à l'API météo pour obtenir les conditions actuelles.
  // `current_weather=true` demande la température et la vitesse du vent en temps réel.
  const meteoReponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  const meteoData = await meteoReponse.json();

  // On retourne uniquement la partie `current_weather` au renderer :
  // { temperature, windspeed, weathercode, ... }
  return meteoData.current_weather;
});


// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
app.whenReady().then(createWindow);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  win.loadFile('renderer/tp.html');
  // win.webContents.openDevTools();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
