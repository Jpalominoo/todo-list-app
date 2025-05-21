import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private tagsSubject = new BehaviorSubject<string[]>(
    this.getTagsFromLocalStorage()
  );
  tags$ = this.tagsSubject.asObservable();

  constructor() {
    // Cuando el servicio se inicializa, carga los tags y los emite
    this.saveTagsToLocalStorage(this.getTagsFromLocalStorage());
  }

  private getTagsFromLocalStorage(): string[] {
    const tags = localStorage.getItem('tags');
    return tags ? JSON.parse(tags) : [];
  }

  private saveTagsToLocalStorage(tags: string[]): void {
    localStorage.setItem('tags', JSON.stringify(tags));
    this.tagsSubject.next(tags);
  }

  getTags(): string[] {
    // Devuelve el valor actual del BehaviorSubject para asegurar coherencia
    return this.tagsSubject.getValue();
  }

  saveTags(tags: string[]): void {
    this.saveTagsToLocalStorage(tags);
  }

  addTag(tag: string): void {
    const tags = this.getTags(); // Obtiene el valor actual
    tags.push(tag);
    this.saveTags(tags); // Guarda y notifica
  }

  removeTag(tag: string): void {
    const tags = this.getTags().filter((t) => t !== tag);
    this.saveTags(tags); // Guarda y notifica
  }

  editTag(oldName: string, newName: string): void {
    const tags = this.getTags();
    const index = tags.indexOf(oldName);
    if (index !== -1) {
      tags[index] = newName;
      this.saveTags(tags); // Guarda y notifica
    }
  }
}