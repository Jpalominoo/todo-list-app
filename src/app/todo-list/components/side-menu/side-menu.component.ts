import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule, NgIf } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { NavigationService } from '../../services/navigation.service';
import { CategoryService } from '../../services/category.service';
import { TagService } from '../../services/tags.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { AddDialogComponent } from '../shared/add-dialog/add-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';


@Component({
  selector: 'todo-list-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  providers: [
    NavigationService,
    ConfirmationService,
    MessageService,
    CategoryService,
    TagService,
    DialogService,
  ],
  standalone: true,
  imports: [
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    NgIf,
    TagModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    AddDialogComponent,
    CalendarModule,
    DialogModule,
    DynamicDialogModule,
  ],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  @ViewChild('editInput') editInput: ElementRef | undefined;

  ref: DynamicDialogRef | undefined;

  items: MenuItem[] | undefined;
  editingCategory: string | null = null;
  editingTag: string | null = null;
  selectedDate: Date | null = null;


  calendarDialogVisible: boolean = false;
  categoryDialogVisible: boolean = false;
  tagDialogVisible: boolean = false;
  categoryDialogHeader: string = '';
  tagDialogHeader: string = '';

  private categorySubscription: Subscription | undefined;
  private tagSubscription: Subscription | undefined;

  constructor(
    private navigationService: NavigationService,
    private categoryService: CategoryService,
    private tagService: TagService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private cdRef: ChangeDetectorRef,
    private dialogService: DialogService, 
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    this.categorySubscription = this.categoryService.categories$.subscribe(
      (categories) => this.updateCategoryItems(categories)
    );
    this.tagSubscription = this.tagService.tags$.subscribe((tags) =>
      this.updateTagItems(tags)
    );
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.tagSubscription) {
      this.tagSubscription.unsubscribe();
    }
    if (this.ref) {
      this.ref.close();
    }
  }

  loadMenu(): void {
    this.items = [
      { separator: true },
      {
        label: 'Tasks',
        items: [
          {
            label: 'Non started',
            icon: 'pi pi-stopwatch',
            badge: '2',
            command: () =>
              this.navigationService.gotoRoute([
                '/dashboard/tasks',
                'non-started-tasks',
              ]),
          },
          {
            label: 'In progress',
            icon: 'pi pi-play-circle',
            badge: '5',
            command: () =>
              this.navigationService.gotoRoute([
                '/dashboard/tasks',
                'in-progress-tasks',
              ]),
          },
          {
            label: 'Paused',
            icon: 'pi pi-pause-circle',
            badge: '2',
            command: () =>
              this.navigationService.gotoRoute([
                '/dashboard/tasks',
                'paused-tasks',
              ]),
          },
          {
            label: 'Late',
            icon: 'pi pi-undo',
            badge: '2',
            command: () =>
              this.navigationService.gotoRoute([
                '/dashboard/tasks',
                'late-tasks',
              ]),
          },
          {
            label: 'Finished',
            icon: 'pi pi-thumbs-up',
            badge: '2',
            command: () =>
              this.navigationService.gotoRoute([
                '/dashboard/tasks',
                'finished-tasks',
              ]),
          },
        ],
      },
      {
        label: 'Categories',
        items: [
          {
            label: 'Add New Category',
            icon: 'pi pi-plus',
            command: () => this.openAddCategoryDialog(),
          },
        ],
      },
      {
        label: 'Tags',
        items: [
          {
            label: 'Add New Tag',
            icon: 'pi pi-plus',
            command: () => this.openAddTagDialog(),
          },
        ],
      },
      { separator: true },
      {
        items: [
          {
            label: 'Calendar',
            icon: 'pi pi-calendar',
            command: () => this.openCalendarDialog()
          },
          {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            command: () => this.navigationService.gotoLogin(),
          },
        ],
      },
    ];
    this.updateCategoryItems(this.categoryService.getCategories());
    this.updateTagItems(this.tagService.getTags());
  }

  openAddCategoryDialog(): void {
    this.categoryDialogVisible = true;
    this.categoryDialogHeader = 'Add New Category';
  }

  openCalendarDialog(): void {
    this.ref = this.dialogService.open(CalendarDialogComponent, { 
      header: 'Select a Date',
      width: '20%',
      height: '47%',
      modal: true,
      data: { initialDate: this.selectedDate },
    });

    this.ref.onClose.subscribe((date: Date | undefined) => {
      if (date) {
        this.selectedDate = date;
        console.log('Selected Date:', this.selectedDate);
        // this.navigationService.gotoCalendar(this.selectedDate);
      }
    });
  }

  openAddTagDialog(): void {
    this.tagDialogVisible = true;
    this.tagDialogHeader = 'Add New Tag';
  }

  addNewCategory(newName: string): void {
    if (newName && newName.trim()) {
      this.categoryService.addCategory(newName.trim());
      this.messageService.add({
        severity: 'success',
        summary: 'Category Added',
        detail: `Category ${newName.trim()} added`,
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Category name cannot be empty',
      });
    }
  }

  addNewTag(newName: string): void {
    if (newName && newName.trim()) {
      this.tagService.addTag(newName.trim());
      this.messageService.add({
        severity: 'success',
        summary: 'Tag Added',
        detail: `Tag ${newName.trim()} added`,
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Tag name cannot be empty',
      });
    }
  }

  editCategory(oldName: string, newName: string): void {
    this.categoryService.editCategory(oldName, newName);
    this.messageService.add({
      severity: 'success',
      summary: 'Category Updated',
      detail: `Category ${oldName} updated to ${newName}`,
    });
  }

  editTag(oldName: string, newName: string): void {
    this.tagService.editTag(oldName, newName);
    this.messageService.add({
      severity: 'success',
      summary: 'Tag Updated',
      detail: `Tag ${oldName} updated to ${newName}`,
    });
  }

  deleteCategory(category: string): void {
    this.categoryService.removeCategory(category);
    this.messageService.add({
      severity: 'success',
      summary: 'Category Deleted',
      detail: `Category ${category} deleted`,
    });
  }

  deleteTag(tag: string): void {
    this.tagService.removeTag(tag);
    this.messageService.add({
      severity: 'success',
      summary: 'Tag Deleted',
      detail: `Tag ${tag} deleted`,
    });
  }

  updateCategoryItems(categories: string[]): void {
    const categoryItems = categories.map((category) => ({
      label: category,
      icon: 'pi pi-tag',
      isDynamic: true,
      command: () => this.startEditCategory(category) // Añade funcionalidad de edición
    }));
    if (this.items) {
      let categoriesMenu = this.items.find(
        (item) => item.label === 'Categories'
      );
      if (categoriesMenu && categoriesMenu.items) {
        categoriesMenu.items = [categoriesMenu.items[0], ...categoryItems];
      }
    }
    this.cdRef.detectChanges();
  }

  updateTagItems(tags: string[]): void {
    const tagItems = tags.map((tag) => ({
      label: tag,
      icon: 'pi pi-hashtag',
      isDynamic: true,
      command: () => this.startEditTag(tag) // Añade funcionalidad de edición
    }));
    if (this.items) {
      let tagsMenu = this.items.find((item) => item.label === 'Tags');
      if (tagsMenu && tagsMenu.items) {
        tagsMenu.items = [tagsMenu.items[0], ...tagItems];
      }
    }
    this.cdRef.detectChanges();
  }

  startEditCategory(category: string): void {
    this.editingCategory = category;
    setTimeout(() => this.editInput?.nativeElement.focus(), 0);
  }

  cancelEditCategory(): void {
    this.editingCategory = null;
  }

  saveEditCategory(oldName: string, newName: string): void {
    if (newName && newName !== oldName) {
      this.editCategory(oldName, newName);
    }
    this.cancelEditCategory();
  }

  startEditTag(tag: string): void {
    this.editingTag = tag;
    setTimeout(() => this.editInput?.nativeElement.focus(), 0);
  }

  cancelEditTag(): void {
    this.editingTag = null;
  }

  saveEditTag(oldName: string, newName: string): void {
    if (newName && newName !== oldName) {
      this.editTag(oldName, newName);
    }
    this.cancelEditTag();
  }

  confirmDeleteCategory(category: string): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${category}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteCategory(category),
    });
  }

  confirmDeleteTag(tag: string): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${tag}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteTag(tag),
    });
  }
}