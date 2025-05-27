import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<string[]>(
    this.getCategoriesFromLocalStorage()
  );
  categories$ = this.categoriesSubject.asObservable();

  constructor() {
    this.saveCategoriesToLocalStorage(this.getCategoriesFromLocalStorage());
  }

  private getCategoriesFromLocalStorage(): string[] {
    const categories = localStorage.getItem('categories');
    return categories ? JSON.parse(categories) : [];
  }

  private saveCategoriesToLocalStorage(categories: string[]): void {
    localStorage.setItem('categories', JSON.stringify(categories));
    this.categoriesSubject.next(categories); 
  }

  getCategories(): string[] {
    return this.categoriesSubject.getValue();
  }

  saveCategories(categories: string[]): void {
    this.saveCategoriesToLocalStorage(categories);
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

  editCategory(oldName: string, newName: string): void {
    const categories = this.getCategories();
    const index = categories.indexOf(oldName);
    if (index !== -1) {
      categories[index] = newName;
      this.saveCategories(categories); 
    }
  }
}