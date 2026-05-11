const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'taches.json');

// ─── Helpers JSON ──────────────────────────────────────────────

function readTodos() {
    if (!fs.existsSync(DB_PATH)) return [];
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
}

function writeTodos(todos) {
    fs.writeFileSync(DB_PATH, JSON.stringify(todos, null, 2), 'utf-8');
}

// ─── Fenêtre ───────────────────────────────────────────────────

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload/preload.js'),
            contextIsolation: true,
        }
    });
    win.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);

// ─── IPC ───────────────────────────────────────────────────────

ipcMain.handle('get-todos', () => {
    return readTodos();
});

ipcMain.handle('add-todo', (_event, text) => {
    const todos = readTodos();
    const todo = { id: Date.now(), text, done: false };
    todos.push(todo);
    writeTodos(todos);
    return todo;
});

ipcMain.handle('toggle-todo', (_event, id) => {
    const todos = readTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) todo.done = !todo.done;
    writeTodos(todos);
    return todo;
});

ipcMain.handle('delete-todo', (_event, id) => {
    const todos = readTodos().filter(t => t.id !== id);
    writeTodos(todos);
});
