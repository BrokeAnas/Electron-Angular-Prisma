import { Injectable } from '@angular/core';
import { Todo } from '../../types/electron';
import { ElectronService } from './electron.service';
@Injectable({
providedIn: 'root' configuration
})
// disponible dans toute l'application sans
export class TodoService {

constructor(private electron: ElectronService) {}
// ─── Lecture ────────────────────────────────────────────────
getTodos(): Promise<Todo[]> {
return this.electron.getApi().getTodos();
// ─── Création ───────────────────────────────────────────────
addTodo(text: string): Promise<Todo> {
return this.electron.getApi().addTodo(text);
// ─── Toggle done/not done ───────────────────────────────────
toggleTodo(id: number): Promise<Todo> {
return this.electron.getApi().toggleTodo(id);
// ─── Suppression ────────────────────────────────────────────
deleteTodo(id: number): Promise<void> {
return this.electron.getApi().deleteTodo(id);
}
}
}
}
}