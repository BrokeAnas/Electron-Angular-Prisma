// Ce fichier déclare les types pour l'objet window.api
// injecté par le preload Electron.
// Il n'est pas exécuté — il sert uniquement au compilateur TypeScript.
export interface Todo {
id: number;
text: string;
done: boolean;
}
export interface ElectronApi {
getTodos: () => Promise<Todo[]>;
addTodo: (text: string) => Promise<Todo>;
toggleTodo: (id: number) => Promise<Todo>;
deleteTodo: (id: number) => Promise<void>;
}
// On "augmente" l'interface Window de TypeScript
// pour lui ajouter notre propriété api
declare global {
interface Window {
api: ElectronApi;
}
}

export interface CounterAPI {
getCounter: () => Promise<number>;
increment: () => Promise<number>;
decrement: () => Promise<number>;
reset: () => Promise<number>;
}
declare global {
interface Window {
api: CounterAPI; // TypeScript sait maintenant que window.api existe
}
}