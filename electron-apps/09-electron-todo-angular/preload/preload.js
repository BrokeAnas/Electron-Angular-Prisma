const { contextBridge, ipcRenderer } = require('electron');

// Ce fichier est identique à la version VanillaJS.
// Le preload expose window.api au renderer, qu'il soit en VanillaJS ou Angular.
contextBridge.exposeInMainWorld('api', {
    getTodos:   ()       => ipcRenderer.invoke('get-todos'),
    addTodo:    (text)   => ipcRenderer.invoke('add-todo', text),
    toggleTodo: (id)     => ipcRenderer.invoke('toggle-todo', id),
    deleteTodo: (id)     => ipcRenderer.invoke('delete-todo', id),
});
