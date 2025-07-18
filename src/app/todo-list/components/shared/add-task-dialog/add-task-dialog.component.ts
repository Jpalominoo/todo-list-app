import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Task } from '../../../interfaces/task.interface';

@Component({
  selector: 'todo-list-add-task-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, InputTextModule, ButtonModule, FormsModule, DropdownModule],
  template: `
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [header]="header"
      [draggable]="false"
      [resizable]="false"
      (onHide)="onDialogHide()"
      [style]="{ width: '400px' }"
      [contentStyle]="{ 'overflow': 'visible' }"
    >
      <div class="flex flex-column gap-3">
        <label for="taskTitle">Title</label>
        <input pInputText id="taskTitle" [(ngModel)]="taskTitle" autofocus />

        <label for="taskDescription">Description (Optional)</label>
        <input pInputText id="taskDescription" [(ngModel)]="taskDescription" />

        <label for="taskStatus">Status</label>
        <p-dropdown
          [options]="taskStatuses"
          [(ngModel)]="selectedStatus"
          placeholder="Select a Status"
          optionLabel="label"
          optionValue="value"
        ></p-dropdown>
      </div>
      <ng-template pTemplate="footer">
        <p-button
          label="Cancel"
          icon="pi pi-times"
          severity="secondary"
          (onClick)="visible = false"
        ></p-button>
        <p-button
          label="Save"
          icon="pi pi-check"
          [disabled]="!taskTitle || taskTitle.trim() === ''"
          (onClick)="saveTask()"
        ></p-button>
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    .flex-column {
      display: flex;
      flex-direction: column;
    }
    .gap-3 {
      gap: 1.5rem; /* Equivalent to 12px or 3 * 0.5rem (primeflex gap-3) */
    }
  `],
})
export class AddTaskDialogComponent {
  @Input() visible: boolean = false;
  @Input() header: string = 'Add New Item';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() valueChange = new EventEmitter<Task>();

  taskTitle: string = '';
  taskDescription: string = '';
  selectedStatus: Task['status'] = 'non-started-tasks'; // Default value

  taskStatuses = [
    { label: 'Non Started', value: 'non-started-tasks' },
    { label: 'In Progress', value: 'in-progress-tasks' },
    { label: 'Paused', value: 'paused-tasks' },
    { label: 'Late', value: 'late-tasks' },
    { label: 'Finished', value: 'finished-tasks' },
  ];

  resetForm(): void {
    this.taskTitle = '';
    this.taskDescription = '';
    this.selectedStatus = 'non-started-tasks';
  }

  onDialogHide(): void {
    this.resetForm();
    this.visibleChange.emit(false);
  }

  saveTask(): void {
    const newTask: Task = {
      id: '', // Will be generated by the service/state
      title: this.taskTitle.trim(),
      description: this.taskDescription.trim() || undefined,
      status: this.selectedStatus,
    };
    this.valueChange.emit(newTask);
    this.visible = false;
  }
}