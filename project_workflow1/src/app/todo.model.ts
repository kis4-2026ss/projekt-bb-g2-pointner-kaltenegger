export interface Todo {
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  done: boolean;
}
