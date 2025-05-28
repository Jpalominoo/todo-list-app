import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Task } from '../../interfaces/task.interface';
import { AddTask, UpdateTask, DeleteTask, LoadTasks, LoadTasksSuccess, LoadTasksFail } from '../actions/tasks.actions';
import { TasksService } from '../../services/tasks.service'; 
import { inject, Injectable } from '@angular/core';

export interface TaskStateModel {
  tasks: Task[];
  loading: boolean;
}

@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    loading: false,
  },
})
@Injectable()
export class TaskState {
  private tasksService = inject(TasksService);

  @Selector()
  static getTasks(state: TaskStateModel): Task[] {
    return state.tasks;
  }

  @Selector()
  static getTasksByStatus(status: Task['status']) {
    console.log((state: TaskStateModel) => state.tasks.map(task => task) as Task[]);
    return (state: TaskStateModel) => state.tasks.filter(task => task.status === status) as Task[];
  }

  @Selector()
  static getLoading(state: TaskStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static nonStartedTasks(state: TaskStateModel): Task[] {
    return state.tasks.filter(task => task.status === 'non-started-tasks');
  }

  @Selector()
  static inProgressTasks(state: TaskStateModel): Task[] {
    return state.tasks.filter(task => task.status === 'in-progress-tasks');
  }

  @Selector()
  static pausedTasks(state: TaskStateModel): Task[] {
    return state.tasks.filter(task => task.status === 'paused-tasks');
  }

  @Selector()
  static lateTasks(state: TaskStateModel): Task[] {
    return state.tasks.filter(task => task.status === 'late-tasks');
  }

  @Selector()
  static finishedTasks(state: TaskStateModel): Task[] {
    return state.tasks.filter(task => task.status === 'finished-tasks');
  }

  constructor() {}

  @Action(LoadTasks)
  loadTasks(ctx: StateContext<TaskStateModel>) {
    ctx.patchState({ loading: true });
    return this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        ctx.dispatch(new LoadTasksSuccess(tasks));
      },
      error: (error) => {
        ctx.dispatch(new LoadTasksFail(error));
      },
    });
  }

  @Action(LoadTasksSuccess)
  loadTasksSuccess(ctx: StateContext<TaskStateModel>, action: LoadTasksSuccess) {
    ctx.patchState({
      tasks: action.tasks,
      loading: false,
    });
  }

  @Action(LoadTasksFail)
  loadTasksFail(ctx: StateContext<TaskStateModel>) {
    ctx.patchState({ loading: false });
  }

  @Action(AddTask)
  addTask(ctx: StateContext<TaskStateModel>, action: AddTask) {
    const state = ctx.getState();
    const newTask = {
      ...action.task,
      id: crypto.randomUUID(),
      subtasks: action.task.subtasks || [],
    };
    ctx.patchState({
      tasks: [...state.tasks, newTask],
    });
    return this.tasksService.addTask(newTask);
  }

  @Action(UpdateTask)
  updateTask(ctx: StateContext<TaskStateModel>, action: UpdateTask) {
    const state = ctx.getState();
    const updatedTasks = state.tasks.map((task) =>
      task.id === action.task.id ? { ...task, ...action.task } : task
    );
    ctx.patchState({
      tasks: updatedTasks,
    });
    return this.tasksService.updateTask(action.task);
  }

  @Action(DeleteTask)
  deleteTask(ctx: StateContext<TaskStateModel>, action: DeleteTask) {
    const state = ctx.getState();
    const filteredTasks = state.tasks.filter((task) => task.id !== action.taskId);
    ctx.patchState({
      tasks: filteredTasks,
    });
    return this.tasksService.deleteTask(action.taskId);
  }
}