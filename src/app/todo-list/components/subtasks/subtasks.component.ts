import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SubTask } from '../../interfaces/task.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'todo-list-subtasks',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, CheckboxModule],
  template: `
    <div class="subtasks-container">
      <h3>Subtasks</h3>
      
      <!-- Add new subtask -->
      <div class="add-subtask">
        <input 
          pInputText 
          [(ngModel)]="newSubtaskTitle" 
          placeholder="Add new subtask..."
          (keyup.enter)="addSubtask()"
        />
        <button pButton icon="pi pi-plus" (click)="addSubtask()" [disabled]="!newSubtaskTitle.trim()"></button>
      </div>

      <!-- Subtasks list -->
      <ul class="subtasks-list">
        <li *ngFor="let subtask of subtasks" class="subtask-item">
          <div class="subtask-content">
            <p-checkbox 
              [ngModel]="subtask.completed" 
              (onChange)="toggleSubtask(subtask)"
              [binary]="true"
            ></p-checkbox>
            <span [class.completed]="subtask.completed">{{ subtask.title }}</span>
          </div>
          <button 
            pButton 
            icon="pi pi-trash" 
            class="p-button-danger p-button-text" 
            (click)="removeSubtask(subtask)"
          ></button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .subtasks-container {
      margin-top: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    h3 {
      margin: 0 0 1rem 0;
      color: #495057;
    }

    .add-subtask {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .subtasks-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .subtask-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      border-bottom: 1px solid #dee2e6;
    }

    .subtask-item:last-child {
      border-bottom: none;
    }

    .subtask-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .completed {
      text-decoration: line-through;
      color: #6c757d;
    }
  `]
})
export class SubtasksComponent {
  @Input() subtasks: SubTask[] = [];
  @Output() subtasksChange = new EventEmitter<SubTask[]>();

  newSubtaskTitle: string = '';

  addSubtask() {
    if (!this.newSubtaskTitle.trim()) return;

    const newSubtask: SubTask = {
      id: uuidv4(),
      title: this.newSubtaskTitle.trim(),
      completed: false,
      parentTaskId: '', // Not needed for local subtasks
    };

    const updatedSubtasks = [...(this.subtasks || []), newSubtask];
    this.subtasksChange.emit(updatedSubtasks);
    this.newSubtaskTitle = '';
  }

  toggleSubtask(subtask: SubTask) {
    const updatedSubtasks = this.subtasks.map(st =>
      st.id === subtask.id ? { ...st, completed: !st.completed } : st
    );
    this.subtasksChange.emit(updatedSubtasks);
  }

  removeSubtask(subtask: SubTask) {
    const updatedSubtasks = this.subtasks.filter(st => st.id !== subtask.id);
    this.subtasksChange.emit(updatedSubtasks);
  }
} 