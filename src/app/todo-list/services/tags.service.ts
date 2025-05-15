import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tagsSubject = new BehaviorSubject<string[]>(this.getTags());
  tags$ = this.tagsSubject.asObservable();

  constructor() { }

  private getTagsFromLocalStorage(): string[] {
        const tags = localStorage.getItem('tags');
        return tags ? JSON.parse(tags) : [];
    }

    private saveTagsToLocalStorage(tags: string[]): void {
        localStorage.setItem('tags', JSON.stringify(tags));
        this.tagsSubject.next(tags);
    }

  getTags(): string[] {
    const tags = localStorage.getItem('tags');
    return tags ? JSON.parse(tags) : [];
  }

  saveTags(tags: string[]): void {
    localStorage.setItem('tags', JSON.stringify(tags));
    this.tagsSubject.next(tags);
  }

  addTag(tag: string): void {
    const tags = this.getTags();
    tags.push(tag);
    this.saveTags(tags);
  }

  removeTag(tag: string): void {
    const tags = this.getTags().filter(t => t !== tag);
    this.saveTags(tags);
  }

  editTag(oldName: string, newName: string): void {
        const tags = this.getTags();
        const index = tags.indexOf(oldName);
        if (index !== -1) {
            tags[index] = newName;
            this.saveTagsToLocalStorage(tags); // Corrected method name
        }
    }
}