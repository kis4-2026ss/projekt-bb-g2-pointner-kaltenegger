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

  // FEHLER 3: Keine Validierung – leere oder reine Leerzeichen-Todos werden gespeichert
  addTodo(): void {
    this.todoService.add({
      title: this.newTitle,
      dueDate: this.newDueDate,
      priority: this.newPriority,
      done: false,
    });
    this.newTitle = '';
    this.newDueDate = '';
    this.newPriority = 'medium';
  }

  // FEHLER 4: Filterlogik ist vertauscht – "Erledigt" zeigt aktive, "Aktiv" zeigt erledigte
  get filteredTodos(): Todo[] {
    const all = this.todoService.todos;
    if (this.activeFilter === 'done') return all.filter(t => !t.done);
    if (this.activeFilter === 'active') return all.filter(t => t.done);
    return all;
  }
}
