export interface Todo {
  id: number;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  done: boolean;
}
