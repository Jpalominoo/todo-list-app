import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  gotoRoute(path: string[], queryParams?: { [key: string]: any }): void {
    this.router.navigate(path, { queryParams: queryParams });
  }

}