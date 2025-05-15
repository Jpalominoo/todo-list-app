import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<string[]>(
    this.getCategories()
  );
  categories$ = this.categoriesSubject.asObservable();

  constructor() {}

  // Helper method to get categories from localStorage
  private getCategoriesFromLocalStorage(): string[] {
    const categories = localStorage.getItem('categories');
    return categories ? JSON.parse(categories) : [];
  }

  // Helper method to save categories to localStorage and update the observable
  private saveCategoriesToLocalStorage(categories: string[]): void {
    localStorage.setItem('categories', JSON.stringify(categories));
    this.categoriesSubject.next(categories); // Notify subscribers of changes
  }

  getCategories(): string[] {
    const categories = localStorage.getItem('categories');
    return categories ? JSON.parse(categories) : [];
  }

  saveCategories(categories: string[]): void {
    localStorage.setItem('categories', JSON.stringify(categories));
    this.categoriesSubject.next(categories);
  }

  addCategory(category: string): void {
    const categories = this.getCategories();
    categories.push(category);
    this.saveCategories(categories);
  }

  removeCategory(category: string): void {
    const categories = this.getCategories().filter((c) => c !== category);
    this.saveCategories(categories);
  }

  // In CategoryService
  editCategory(oldName: string, newName: string): void {
    const categories = this.getCategories();
    const index = categories.indexOf(oldName);
    if (index !== -1) {
      categories[index] = newName;
      this.saveCategoriesToLocalStorage(categories);
    }
  }
}
