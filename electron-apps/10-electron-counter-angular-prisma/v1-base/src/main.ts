import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';

// ─── Persistance JSON ──────────────────────────────────────────
// Le compteur est sauvegardé dans un fichier counter.json
// à la racine du projet.
// __dirname = dossier dist/ (là où main.js est compilé)
// '..' remonte à la racine du projet

const DATA_FILE = path.join(__dirname, '..', 'counter.json');

// Lit la valeur depuis le fichier JSON.
// Si le fichier n'existe pas encore, retourne 0 (premier lancement).
function readCounter(): number {
    if (!fs.existsSync(DATA_FILE)) {
        return 0;
    }
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    return data.value ?? 0;
}

// Écrit la valeur dans le fichier JSON.
function writeCounter(value: number): void {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ value }), 'utf-8');
}

// ─── Fenêtre ───────────────────────────────────────────────────

function createWindow(): void {
    const win = new BrowserWindow({
        width: 500,
        height: 450,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    });

    win.loadFile(
        path.join(__dirname, '..', 'renderer/app/dist/app/browser/index.html')
    );
}

app.whenReady().then(() => {
    createWindow();
});

// ─── IPC ───────────────────────────────────────────────────────
// Chaque handler reçoit un message du Renderer (via preload),
// effectue l'opération sur le compteur, persiste dans le JSON,
// et retourne la nouvelle valeur.

ipcMain.handle('get-counter', (): number => {
    return readCounter();
});

ipcMain.handle('increment', (): number => {
    const value = readCounter() + 1;
    writeCounter(value);
    return value;
});

ipcMain.handle('decrement', (): number => {
    const value = readCounter() - 1;
    writeCounter(value);
    return value;
});

ipcMain.handle('reset', (): number => {
    writeCounter(0);
    return 0;
});
