export interface Task {
  id?: string;
  title: string;
  description?: string;
  status: 'non-started-tasks' | 'in-progress-tasks' | 'paused-tasks' | 'late-tasks' | 'finished-tasks';
  category?: string;
  tag?: string;
  date?: string | Date;
  subtasks?: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  parentTaskId: string;
}