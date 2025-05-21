import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
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
  @ViewChild('editInput') editInput: ElementRef | undefined; // Kept for potential future use

  ref: DynamicDialogRef | undefined;

  items: MenuItem[] | undefined;
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
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef for manual change detection
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    // Subscribe to category and tag observables to automatically update the menu
    this.categorySubscription = this.categoryService.categories$.subscribe(
      (categories) => {
        this.updateCategoryItems(categories);
        this.cdRef.detectChanges(); // Force change detection after categories update
      }
    );
    this.tagSubscription = this.tagService.tags$.subscribe((tags) => {
      this.updateTagItems(tags);
      this.cdRef.detectChanges(); // Force change detection after tags update
    });
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

  /**
   * Initializes the side menu items.
   */
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
    // Initially load categories and tags and force change detection
    this.updateCategoryItems(this.categoryService.getCategories());
    this.updateTagItems(this.tagService.getTags());
    this.cdRef.detectChanges(); // Initial force detection
  }

  /**
   * Opens the dialog for adding a new category.
   */
  openAddCategoryDialog(): void {
    this.categoryDialogVisible = true;
    this.categoryDialogHeader = 'Add New Category';
  }

  /**
   * Opens the calendar dialog.
   */
  openCalendarDialog(): void {
    this.ref = this.dialogService.open(CalendarDialogComponent, {
      header: 'Select a date',
      width: '350px',
      height: '450px',
      modal: true,
      data: { initialDate: this.selectedDate },
    });

    this.ref.onClose.subscribe((date: Date | undefined) => {
      if (date) {
        this.selectedDate = date;
        console.log('Selected Date:', this.selectedDate);
        // this.navigationService.gotoCalendar(this.selectedDate); // Example navigation if needed
      }
    });
  }

  /**
   * Opens the dialog for adding a new tag.
   */
  openAddTagDialog(): void {
  this.tagDialogVisible = true;
  this.tagDialogHeader = 'Add New Tag';
}

  /**
   * Adds a new category.
   * @param newName The name of the new category.
   */
  addNewCategory(newName: string): void {
    if (newName && newName.trim()) {
      this.categoryService.addCategory(newName.trim());
      this.messageService.add({
        severity: 'success',
        summary: 'Category Added',
        detail: `Category ${newName.trim()} added`,
      });
      // The subscription to categories$ with cdRef.detectChanges() should handle the UI update.
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Category name cannot be empty',
      });
    }
  }

  /**
   * Adds a new tag.
   * @param newName The name of the new tag.
   */
  addNewTag(newName: string): void {
    if (newName && newName.trim()) {
      this.tagService.addTag(newName.trim());
      this.messageService.add({
        severity: 'success',
        summary: 'Tag Added',
        detail: `Tag ${newName.trim()} added`,
      });
      // The subscription to tags$ with cdRef.detectChanges() should handle the UI update.
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Tag name cannot be empty',
      });
    }
  }

  /**
   * Edits an existing category (calls service method).
   * @param oldName The original name of the category.
   * @param newName The new name for the category.
   */
  editCategory(oldName: string, newName: string): void {
    this.categoryService.editCategory(oldName, newName);
    this.messageService.add({
      severity: 'success',
      summary: 'Category Updated',
      detail: `Category "${oldName}" updated to "${newName}"`,
    });
  }

  /**
   * Edits an existing tag (calls service method).
   * @param oldName The original name of the tag.
   * @param newName The new name for the tag.
   */
  editTag(oldName: string, newName: string): void {
    this.tagService.editTag(oldName, newName);
    this.messageService.add({
      severity: 'success',
      summary: 'Tag Updated',
      detail: `Tag "${oldName}" updated to "${newName}"`,
    });
  }

  /**
   * Deletes a category.
   * @param category The name of the category to delete.
   */
  deleteCategory(category: string): void {
    this.categoryService.removeCategory(category);
    this.messageService.add({
      severity: 'success',
      summary: 'Category Deleted',
      detail: `Category ${category} deleted`,
    });
    // The subscription should handle the UI update.
  }

  /**
   * Deletes a tag.
   * @param tag The name of the tag to delete.
   */
  deleteTag(tag: string): void {
    this.tagService.removeTag(tag);
    this.messageService.add({
      severity: 'success',
      summary: 'Tag Deleted',
      detail: `Tag ${tag} deleted`,
    });
    // The subscription should handle the UI update.
  }

  /**
   * Updates the category items in the menu.
   * @param categories The updated list of categories.
   */
  updateCategoryItems(categories: string[]): void {
    const categoryItems = categories.map((category) => ({
      label: category,
      icon: 'pi pi-tag',
      isDynamic: true,
      command: () => this.startEditCategoryItem(category) // This command is currently inactive
    }));
    if (this.items) {
      let categoriesMenu = this.items.find(
        (item) => item.label === 'Categories'
      );
      if (categoriesMenu && categoriesMenu.items) {
        // Ensure the array reference changes for PrimeNG to detect updates in the submenu.
        // The first item (Add New Category) is preserved.
        categoriesMenu.items = [categoriesMenu.items[0], ...categoryItems];
      }
    }
  }

  /**
   * Updates the tag items in the menu.
   * @param tags The updated list of tags.
   */
  updateTagItems(tags: string[]): void {
    const tagItems = tags.map((tag) => ({
      label: tag,
      icon: 'pi pi-hashtag',
      isDynamic: true,
      command: () => this.startEditTagItem(tag) // This command is currently inactive
    }));
    if (this.items) {
      let tagsMenu = this.items.find((item) => item.label === 'Tags');
      if (tagsMenu && tagsMenu.items) {
        // Ensure the array reference changes for PrimeNG to detect updates in the submenu.
        // The first item (Add New Tag) is preserved.
        tagsMenu.items = [tagsMenu.items[0], ...tagItems];
      }
    }
  }

  // --- Commented Out Editing Logic (for future reference) ---

  /**
   * Starts the inline editing mode for a category.
   * Currently commented out, only logs to console.
   * @param categoryLabel The label of the category to edit.
   */
  startEditCategoryItem(categoryLabel: string): void {
    console.log('Edit Category clicked for (no action defined):', categoryLabel);
    /*
    // Uncomment to enable inline editing
    this.items?.forEach(item => {
      if (item['isDynamic'] && item.icon === 'pi pi-tag') {
        item['isEditing'] = (item.label === categoryLabel);
        if (item['isEditing']) {
          item['oldLabel'] = item.label; // Store original label
        }
      }
    });
    this.cdRef.detectChanges();
    setTimeout(() => this.editInput?.nativeElement.focus(), 0);
    */
  }

  /**
   * Cancels the inline editing for a category.
   * Currently commented out.
   * @param item The category MenuItem being edited.
   */
  cancelEditCategory(item: any): void {
    /*
    // Uncomment to enable inline editing
    item.label = item.oldLabel; // Restore original label
    item.isEditing = false;
    this.cdRef.detectChanges();
    */
  }

  /**
   * Saves the edited category name.
   * Currently commented out.
   * @param oldName The original name of the category.
   * @param newName The new name for the category.
   */
  saveEditCategory(oldName: string, newName: string): void {
    /*
    // Uncomment to enable inline editing
    // Check if the new name is different from the old name and not empty
    if (newName && newName.trim() !== '' && oldName !== newName) {
      this.categoryService.editCategory(oldName, newName);
      this.messageService.add({
        severity: 'success',
        summary: 'Category Updated',
        detail: `Category "${oldName}" updated to "${newName}"`,
      });
    } else if (newName.trim() === '') {
        this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Category name cannot be empty',
        });
    }
    // Find the item and set isEditing to false
    this.items?.forEach(item => {
      if (item['isDynamic'] && item.icon === 'pi pi-tag' && item.label === newName) {
        item['isEditing'] = false;
      }
    });
    this.cdRef.detectChanges();
    */
  }

  /**
   * Starts the inline editing mode for a tag.
   * Currently commented out, only logs to console.
   * @param tagLabel The label of the tag to edit.
   */
  startEditTagItem(tagLabel: string): void {
    console.log('Edit Tag clicked for (no action defined):', tagLabel);
    /*
    // Uncomment to enable inline editing
    this.items?.forEach(item => {
      if (item['isDynamic'] && item.icon === 'pi pi-hashtag') {
        item['isEditing'] = (item.label === tagLabel);
        if (item['isEditing']) {
          item['oldLabel'] = item.label; // Store original label
        }
      }
    });
    this.cdRef.detectChanges();
    setTimeout(() => this.editInput?.nativeElement.focus(), 0);
    */
  }

  /**
   * Cancels the inline editing for a tag.
   * Currently commented out.
   * @param item The tag MenuItem being edited.
   */
  cancelEditTag(item: any): void {
    /*
    // Uncomment to enable inline editing
    item.label = item.oldLabel; // Restore original label
    item.isEditing = false;
    this.cdRef.detectChanges();
    */
  }

saveEditTag(oldName: string, newName: string): void {
    /*
    if (newName && newName.trim() !== '' && oldName !== newName) {
      this.tagService.editTag(oldName, newName);
      this.messageService.add({
        severity: 'success',
        summary: 'Tag Updated',
        detail: `Tag "${oldName}" updated to "${newName}"`,
      });
    } else if (newName.trim() === '') {
        this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Tag name cannot be empty',
        });
    }
    // Find the item and set isEditing to false
    this.items?.forEach(item => {
      if (item['isDynamic'] && item.icon === 'pi pi-hashtag' && item.label === newName) {
        item['isEditing'] = false;
      }
    });
    this.cdRef.detectChanges();
    */
  }

  // --- End Commented Out Editing Logic ---

  /**
   * Confirms the deletion of a category before proceeding.
   * @param category The name of the category to delete.
   */
  confirmDeleteCategory(category: string): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${category}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteCategory(category),
    });
  }

  /**
   * Confirms the deletion of a tag before proceeding.
   * @param tag The name of the tag to delete.
   */
  confirmDeleteTag(tag: string): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${tag}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteTag(tag),
    });
  }
}