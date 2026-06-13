Das Problem ist ein klassischer Konflikt zwischen der `fixed`-Positionierung des Headers und dem Content-Flow. Dass Elemente erst ab dem vierten Eintrag erscheinen, liegt daran, dass der Container-Inhalt durch `white-space: nowrap` und fehlende `flex-wrap`-Eigenschaften horizontal aus dem Sichtbereich gedrückt wird, oder der feste `padding-top` den sichtbaren Bereich nach unten verschiebt.

Hier ist die Lösung für ein robustes, responsives Layout:

### 1. CSS-Anpassungen (Layout-Fix)
Wir entfernen die absolute Positionierung der Buttons und nutzen `flex-wrap` für die `todo-item` Zeilen. Zudem ersetzen wir das starre `padding-top` durch eine flexiblere Lösung.

**Datei: `app.component.css`** (ersetze den relevanten Teil)
```css
/* Body-Padding entfernen, wir nutzen stattdessen einen Spacer */
body {
  padding-top: 0;
}

/* Platzhalter für den Fixed-Header */
.header-spacer {
  height: 180px; /* Passt sich dynamisch an oder einfach als fixer Buffer */
}

.todo-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* Erlaubt Umbruch bei kleinen Bildschirmen */
  gap: 10px;
  padding: 14px 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
}

.todo-title {
  flex: 1;
  min-width: 150px; /* Titel nicht zu klein werden lassen */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* Besser für Übersichtlichkeit, aber mit min-width */
}

/* Entferne die absolute Positionierung des Buttons */
.btn-danger {
  position: static; 
  transform: none;
}

@media (max-width: 600px) {
  .todo-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .input-row {
    flex-direction: column;
    align-items: stretch;
  }
}
```

### 2. HTML-Struktur-Anpassung
Wir fügen einen `header-spacer` ein, damit der Content nicht unter den Header rutscht.

**Datei: `app.component.html`**
```html
<header class="add-container">
  <!-- ... Inhalt wie gehabt ... -->
</header>

<!-- Dieser Div sorgt dafür, dass die Liste unter dem Header startet -->
<div class="header-spacer"></div>

<main style="padding: 20px;">
  <ul class="todo-list">
    <li *ngFor="let todo of filteredTodos; let i = index" class="todo-item" [class.todo-done]="todo.done">
      <input type="checkbox" class="todo-checkbox" [checked]="todo.done" (change)="todoService.toggle(i)" />
      <span class="todo-title">{{ todo.title }}</span>
      <span class="priority-badge priority-{{ todo.priority }}">{{ todo.priority }}</span>
      <span class="due-date">{{ todo.dueDate }}</span>
      <button class="btn btn-danger" (click)="todoService.delete(i)">Löschen</button>
    </li>
  </ul>
  
  <div class="footer-actions">
    <button class="btn btn-danger" (click)="todoService.clearAll()">Liste leeren</button>
  </div>
</main>
```

### 3. Logik-Check (Filter-Logik)
Du hattest in deiner `AppComponent` noch eine kleine Vertauschung bei den Filtern. Stelle sicher, dass sie so aussieht:

**Datei: `app.component.ts`**
```typescript
get filteredTodos(): Todo[] {
  const all = this.todoService.todos;
  if (this.activeFilter === 'done') return all.filter(t => t.done);
  if (this.activeFilter === 'active') return all.filter(t => !t.done);
  return all;
}
```

### Warum das funktioniert:
1.  **`header-spacer`**: Da der Header `fixed` ist, nimmt er keinen Platz im normalen Dokumentenfluss ein. Der Spacer schiebt den Rest der Seite sauber nach unten.
2.  **`flex-wrap` & `flex-direction`**: Bei sehr kleinen Bildschirmen (Smartphones) schalten wir die Liste in eine vertikale Spaltenansicht um. Das verhindert, dass Elemente abgeschnitten werden oder über den Bildschirmrand hinausgehen.
3.  **`overflow: hidden`**: Dies verhindert, dass extrem lange Todo-Titel das gesamte Layout sprengen. Sie werden nun bei Bedarf mit `...` abgekürzt, anstatt die anderen Spalten aus dem Bild zu drängen.

Versuche diese Änderungen; sie sollten das Layout stabilisieren und die Darstellung ab dem ersten Element korrekt anzeigen.