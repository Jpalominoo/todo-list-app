import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'todo-list-tasks-page',
  templateUrl: './tasks-page.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ButtonModule,]
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
        this.taskData = { title: 'Non Started Tasks: '};
        break;
      case 'in-progress-tasks':
        this.taskData = { title: 'In Progress Tasks'};
        break;
      case 'paused-tasks':
        this.taskData = { title: 'Paused Tasks'};
        break;
      case 'late-tasks':
        this.taskData = { title: 'Late Tasks'};
        break;
      case 'finished-tasks':
        this.taskData = { title: 'Finished Tasks' };
        break;


      default:
        this.taskData = { title: 'Tasks'};
        break;
    }
    console.log('Datos de la tarea cargados:', this.taskData);
  }
}