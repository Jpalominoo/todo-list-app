import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'todo-list-tasks-page',
  templateUrl: './tasks-page.component.html',
  standalone: true,
  imports: [NgIf, NgFor]
})
export default class TasksPageComponent implements OnInit {
  taskIdentifier: string | null = null;
  taskData: any; // todo // aqui pondre la informacion de la tarea

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskIdentifier = params.get('id');

      if (this.taskIdentifier) {
        this.loadTaskData(this.taskIdentifier);
      }
    });
  }

  loadTaskData(id: string): void {
    switch (id) {
      case 'non-started-tasks':
        this.taskData = { title: 'Non Started Tasks: ', description: 'General info about tasks', items: [], buttontext: 'Add Task' };
        break;
      case 'in-progress-tasks':
        this.taskData = { title: 'In Progress Tasks', description: 'General info about tasks', items: [], buttontext: 'Add Task' };
        break;
      case 'paused-tasks':
        this.taskData = { title: 'Paused Tasks', description: 'General info about tasks', items: [], buttontext: 'Add Task' };
        break;
      case 'late-tasks':
        this.taskData = { title: 'Late Tasks', description: 'General info about tasks', items: [], buttontext: 'Add Task' };
        break;
      case 'finished-tasks':
        this.taskData = { title: 'Finished Tasks', description: 'General info about tasks', items: [], buttontext: 'Add Task' };
        break;


      default:
        this.taskData = { title: 'Tasks', description: 'General info about tasks', items: [], buttontext: 'Add Task' };
        break;
    }
    console.log('Datos de la tarea cargados:', this.taskData);
  }
}