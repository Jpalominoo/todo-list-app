import { Injectable, signal, effect } from '@angular/core';
import { Subject } from 'rxjs';

export interface Category {
    label: string;
    value: string;
    icon?: string;
}

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private _categories = signal<Category[]>([
        { label: 'Personal', value: 'personal', icon: 'pi pi-user' },
        { label: 'Work', value: 'work', icon: 'pi pi-briefcase' },
        { label: 'Shopping', value: 'shopping', icon: 'pi pi-shopping-cart' },
    ]);

    categories = this._categories.asReadonly();

    categoryAdded$ = new Subject<Category>();

    constructor() {
        const savedCategories = localStorage.getItem('taskCategories');
        if (savedCategories) {
            try {
                this._categories.set(JSON.parse(savedCategories));
            } catch (error) {
                console.error('Error al analizar las categorías guardadas', error);
                localStorage.removeItem('taskCategories');
            }
        }

        // Utiliza el efecto de Angular para guardar en localStorage
        effect(() => {
            const categoriesToSave = this._categories(); // Obtén el valor actual de la señal
            if (typeof window !== 'undefined') {
                localStorage.setItem('taskCategories', JSON.stringify(categoriesToSave));
            }
        });
    }

    addCategory(category: Category): void {
        this._categories.update(currentCategories => [...currentCategories, category]);
        this.categoryAdded$.next(category);
    }

    getCategories(): Category[] {
        return this._categories();
    }
}
