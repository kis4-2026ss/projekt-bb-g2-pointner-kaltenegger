import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newTitle = '';
  newDueDate = '';
  newPriority: 'low' | 'medium' | 'high' = 'medium';
  activeFilter: 'all' | 'active' | 'done' = 'all';

  constructor(public todoService: TodoService) {}

  addTodo(): void {
    if (!this.newTitle.trim()) return;

    this.todoService.add({
      title: this.newTitle.trim(),
      dueDate: this.newDueDate,
      priority: this.newPriority,
      done: false,
    });
    this.newTitle = '';
    this.newDueDate = '';
    this.newPriority = 'medium';
  }

  get filteredTodos(): Todo[] {
    const all = this.todoService.todos;
    if (this.activeFilter === 'done') return all.filter(t => t.done);
    if (this.activeFilter === 'active') return all.filter(t => !t.done);
    return all;
  }
}
