import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos: Todo[] = [
    {
      title: 'Angular-Dokumentation lesen',
      dueDate: '2026-06-10',
      priority: 'high',
      done: false,
    },
    {
      title: 'Wocheneinkauf erledigen',
      dueDate: '2026-06-07',
      priority: 'low',
      done: true,
    },
    {
      title: 'Sport machen',
      dueDate: '2026-06-08',
      priority: 'medium',
      done: false,
    },
  ];

  add(todo: Todo): void {
    this.todos.push(todo);
  }

  delete(index: number): void {
    this.todos.splice(index, 1);
  }

  toggle(index: number): void {
    this.todos[index].done = !this.todos[index].done;
  }

  clearAll(): void {
    this.todos = [];
  }
}
