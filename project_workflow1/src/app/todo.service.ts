import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Angular-Dokumentation lesen',
      dueDate: '2026-06-10',
      priority: 'high',
      done: false,
    },
    {
      id: 2,
      title: 'Wocheneinkauf erledigen',
      dueDate: '2026-06-07',
      priority: 'low',
      done: true,
    },
    {
      id: 3,
      title: 'Sport machen',
      dueDate: '2026-06-08',
      priority: 'medium',
      done: false,
    },
  ];
  private nextId = 4;

  add(todo: Omit<Todo, 'id'>): void {
    this.todos.push({ ...todo, id: this.nextId++ });
  }

  delete(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  toggle(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.done = !todo.done;
    }
  }

  clearAll(): void {
    this.todos = [];
  }
}
