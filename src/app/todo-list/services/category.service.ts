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
    // Cuando el servicio se inicializa, carga las categorías y las emite
    this.saveCategoriesToLocalStorage(this.getCategoriesFromLocalStorage());
  }

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

  // Este método ahora es redundante si `saveCategoriesToLocalStorage` es el único punto de escritura.
  // Pero lo mantendré para evitar pisar tu código existente.
  getCategories(): string[] {
    // Devuelve el valor actual del BehaviorSubject para asegurar coherencia
    return this.categoriesSubject.getValue();
  }

  saveCategories(categories: string[]): void {
    this.saveCategoriesToLocalStorage(categories);
  }

  addCategory(category: string): void {
    const categories = this.getCategories(); // Obtiene el valor actual
    categories.push(category);
    this.saveCategories(categories); // Guarda y notifica
  }

  removeCategory(category: string): void {
    const categories = this.getCategories().filter((c) => c !== category);
    this.saveCategories(categories); // Guarda y notifica
  }

  editCategory(oldName: string, newName: string): void {
    const categories = this.getCategories();
    const index = categories.indexOf(oldName);
    if (index !== -1) {
      categories[index] = newName;
      this.saveCategories(categories); // Guarda y notifica
    }
  }
}