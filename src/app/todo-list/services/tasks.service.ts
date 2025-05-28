import { effect, Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'; // Make sure uuidv4 is imported if you use it for IDs
import { Task } from '../interfaces/task.interface';
import { Observable, of } from 'rxjs';

const loadTasksFromLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    try {
      // Attempt to parse the JSON string
      const parsedTasks = JSON.parse(tasks);
      // Check if the parsed result is actually an array
      if (Array.isArray(parsedTasks)) {
        return parsedTasks;
      } else {
        // If it's not an array, log a warning and return an empty array
        console.warn('LocalStorage "tasks" item is not an array. Clearing storage.');
        localStorage.removeItem('tasks'); // Clear the corrupt entry
        return [];
      }
    } catch (e) {
      // If JSON.parse fails (e.g., malformed JSON), log the error and return an empty array
      console.error('Error parsing tasks from Local Storage:', e);
      localStorage.removeItem('tasks'); // Clear the corrupt entry
      return [];
    }
  }
  return []; // If no 'tasks' item found in localStorage, return an empty array
};

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  // Initialize the signal with the safely loaded tasks
  tasks = signal<Task[]>(loadTasksFromLocalStorage());
  private readonly STORAGE_KEY = 'tasks';

  constructor() {
    // This effect ensures that changes to the 'tasks' signal are saved to localStorage
    effect(() => {
      // Ensure that this.tasks() returns an array before stringifying
      const currentTasks = this.tasks();
      if (Array.isArray(currentTasks)) {
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
      } else {
        console.error('Attempted to save non-array to localStorage for "tasks" key:', currentTasks);
        // Optionally, you might want to clear it here if it's consistently wrong
        // localStorage.removeItem('tasks');
      }
    });
  }

  // --- Rest of your TasksService methods (addTask, updateTask, deleteTask, generateId) ---

  addTask(newTask: Task): Observable<Task> {
    const taskToAdd: Task = {
      ...newTask,
      id: newTask.id || this.generateId(),
    };
    this.tasks.update((list) => [...list, taskToAdd]);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks()));
    return of(taskToAdd);
  }

  updateTask(updatedTask: Task): Observable<Task> {
    this.tasks.update((currentTasks) => {
      const index = currentTasks.findIndex((task) => task.id === updatedTask.id);
      if (index > -1) {
        const newTasks = [...currentTasks];
        newTasks[index] = updatedTask;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newTasks));
        return newTasks;
      }
      return currentTasks;
    });
    return of(updatedTask);
  }

  deleteTask(taskID: string): Observable<void> {
    this.tasks.update((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskID)
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks()));
    return of(void 0);
  }

  // Add a generateId if not already present
  private generateId(): string {
    return uuidv4();
  }

  // Method to get all tasks (used by TaskState)
  getAllTasks(): Task[] {
    return this.tasks();
  }

  getTasks(): Observable<Task[]> {
    const tasks = this.getAllTasks();
    return of(tasks);
  }
}