import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar'; 
import { DropdownModule } from 'primeng/dropdown';
import { Select } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Task } from '../../interfaces/task.interface';
import { FormsModule } from '@angular/forms';

interface City {
  name: string;
  code: string;
}

@Component({
    selector: 'todo-list-right-menu',
    templateUrl: './right-menu.component.html',
    styleUrls: ['./right-menu.component.css'],
    standalone: true,
    imports: [Menu, ToastModule, InputTextModule, FloatLabel , CalendarModule, DropdownModule, Select, TagModule, CommonModule, ButtonModule, FormsModule]
})
export class RightMenuComponent implements OnInit, OnChanges {
  @Input() task: Task | null = null;
  @Output() closeMenu = new EventEmitter<void>();
  @Output() saveTaskEvent = new EventEmitter<Partial<Task>>();

  // Campos editables
  title: string = '';
  description: string = '';
  status: Task['status'] = 'non-started-tasks';
  category: string = '';
  date: Date | null = null;
  tag: string = '';

  cities: City[] | undefined;

    selectedCity: City | undefined;

    items: MenuItem[] | undefined;

    ngOnInit() {

      this.items = [
        {
          separator: true
        },
        {
          label: 'Tags',
          items: [
              {
                  tag: ' Tag 1', 
              },

              {
                  tag: ' Tag 2', 
              },

              {

                  tag: ' + Add Tag', 
              }
          ]
      },
      {
        separator: true
       },
        {
            label: 'Subtasks',
            items: [
                {
                    label: 'Add New Subtask',
                    icon: 'pi pi-plus'
                },
                {
                    label: 'Subtask 1',
                },
                {
                  label: 'Subtask 2',
                },
                {
                  label: 'Subtask 3',
                }
                
            ]
        },

        {
          items: [
              {
                sublabel: 'Save Changes',
              }
              
          ]
      }
    ];

    this.cities = [
      { name: 'Category 1', code: 'NY' },
      { name: 'Category 2', code: 'RM' },
      { name: 'Category 3', code: 'LDN' }
  ];

    }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.title = this.task.title;
      this.description = this.task.description || '';
      this.status = this.task.status;
      // category, date, tag se pueden mapear aquí si existen en Task
    }
  }

  saveTask() {
    if (!this.task) return;
    this.saveTaskEvent.emit({
      ...this.task,
      title: this.title,
      description: this.description,
      status: this.status,
      // category, date, tag pueden añadirse aquí si están en Task
    });
  }
}