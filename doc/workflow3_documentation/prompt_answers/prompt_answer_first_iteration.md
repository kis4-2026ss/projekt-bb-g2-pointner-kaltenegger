Hallo. Als Senior Software Engineer habe ich den Code analysiert. Es gibt einige kritische Logikfehler in der Datenverarbeitung und Layout-Probleme durch die `fixed`-Positionierung.

Hier ist die systematische Korrektur:

### 1. Korrektur der `TodoService`-Logik
Die Methoden `delete` und `toggle` arbeiten fehlerhaft (löschen immer das letzte Element / toggeln alle Elemente).

**Datei: `todo.service.ts`**
```typescript
@Injectable({ providedIn: 'root' })
export class TodoService {
  todos: Todo[] = [...]; // Initialwerte

  add(todo: Todo): void {
    this.todos.push(todo);
  }

  delete(index: number): void {
    // Korrekt: Entfernt das Element am spezifischen Index
    this.todos.splice(index, 1);
  }

  toggle(index: number): void {
    // Korrekt: Toggelt nur das spezifische Element
    this.todos[index].done = !this.todos[index].done;
  }

  clearAll(): void {
    this.todos.length = 0; // Referenz beibehalten
  }
}
```

### 2. Korrektur der Filter-Logik
Die Logik in der `AppComponent` war invertiert.

**Datei: `app.component.ts`**
```typescript
get filteredTodos(): Todo[] {
  const all = this.todoService.todos;
  if (this.activeFilter === 'done') return all.filter(t => t.done);
  if (this.activeFilter === 'active') return all.filter(t => !t.done);
  return all;
}
```

### 3. Layout- und Styling-Fixes
Da der Header `fixed` ist, überdeckt er den Anfang der Liste. Zudem ist der Button "Liste leeren" isoliert.

**Datei: `app.component.css`**
```css
/* Padding am Body, um Überdeckung durch den Fixed-Header zu verhindern */
body {
  padding-top: 160px; /* An Höhe des Headers anpassen */
}

/* Button "Liste leeren" besser integrieren */
.footer-actions {
  padding: 20px;
  text-align: right;
}
```

**Datei: `app.component.html`**
```html
<!-- Liste in einen Container, um Abstand zu wahren -->
<main style="padding: 20px;">
  <ul class="todo-list">
    <!-- ... gleicher Inhalt ... -->
  </ul>
  
  <div class="footer-actions">
    <button class="btn btn-danger" (click)="todoService.clearAll()">Liste leeren</button>
  </div>
</main>
```

### Zusammenfassung der Änderungen:

1.  **Logik-Fixes**: `TodoService` greift nun korrekt auf die Indizes zu. Die Filterlogik wurde in `AppComponent` umgekehrt, sodass "Aktiv" auch nur aktive Todos anzeigt.
2.  **Layout-Fixes**: 
    *   Das `padding-top` auf dem `body` stellt sicher, dass die Liste unter dem `fixed`-Header beginnt, anstatt darunter zu verschwinden.
    *   Der "Liste leeren"-Button wurde aus dem Layout-Chaos gelöst und in einen logischen Footer-Bereich verschoben.
3.  **Wartbarkeit**: Die Verwendung von `this.todos.length = 0` ist sauberer als die Neuzuweisung eines leeren Arrays, da sie die Objekt-Referenz für Angular stabil hält.

Mit diesen Änderungen ist die Anwendung funktionsfähig, die Logik korrekt und das Layout responsiv sowie benutzbar.