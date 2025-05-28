import { Task } from '../../interfaces/task.interface';

export class AddTask {
  static readonly type = '[Tasks] Add Task';
  constructor(public task: Task) {}
}

export class UpdateTask {
  static readonly type = '[Tasks] Update Task';
  constructor(public task: Task) {}
}

export class DeleteTask {
  static readonly type = '[Tasks] Delete Task';
  constructor(public taskId: string) {}
}

export class LoadTasks {
  static readonly type = '[Tasks] Load Tasks';
}

export class LoadTasksSuccess {
  static readonly type = '[Tasks] Load Tasks Success';
  constructor(public tasks: Task[]) {}
}

export class LoadTasksFail {
  static readonly type = '[Tasks] Load Tasks Fail';
  constructor(public error: any) {}
}