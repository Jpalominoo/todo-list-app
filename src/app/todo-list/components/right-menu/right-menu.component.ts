import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar'; 
import { DropdownModule } from 'primeng/dropdown';
import { Select } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Task, SubTask } from '../../interfaces/task.interface';
import { FormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';
import { TagService } from '../../services/tags.service';
import { Subscription } from 'rxjs';
import { SubtasksComponent } from '../subtasks/subtasks.component';

@Component({
    selector: 'todo-list-right-menu',
    templateUrl: './right-menu.component.html',
    styleUrls: ['./right-menu.component.css'],
    standalone: true,
    imports: [
        ToastModule, 
        InputTextModule, 
        FloatLabel, 
        CalendarModule, 
        DropdownModule, 
        Select, 
        TagModule, 
        CommonModule, 
        ButtonModule, 
        FormsModule,
        SubtasksComponent
    ]
})
export class RightMenuComponent implements OnInit, OnChanges, OnDestroy {
  @Input() task: Task | null = null;
  @Output() closeMenu = new EventEmitter<void>();
  @Output() saveTaskEvent = new EventEmitter<{ task: Task, closeMenu: boolean }>();

  editedTask: Task | null = null;

  categories: Category[] = [];
  tags: string[] = [];

  private categorySub!: Subscription;
  private tagSub!: Subscription;

  constructor(private categoryService: CategoryService, private tagService: TagService) {}

  ngOnInit() {
    this.categorySub = this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });
    this.tagSub = this.tagService.tags$.subscribe(tags => {
      this.tags = tags;
    });
    if (this.task) {
      this.editedTask = JSON.parse(JSON.stringify(this.task));
    }
  }

  ngOnDestroy() {
    if (this.categorySub) this.categorySub.unsubscribe();
    if (this.tagSub) this.tagSub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.editedTask = JSON.parse(JSON.stringify(this.task));
    }
  }

  saveTask() {
    if (!this.editedTask) return;
    this.saveTaskEvent.emit({ task: this.editedTask, closeMenu: true });
  }

  onSubtaskChange(subtasks: SubTask[]) {
    if (this.editedTask) this.editedTask.subtasks = subtasks;
  }
}