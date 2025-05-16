import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../todo-list/services/auth.service'; // Ajusta la ruta si es necesario
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);


  return authService.isAuthenticated$.pipe(
     tap(isAuthenticated => {
       if (!isAuthenticated) {
         router.navigate(['/login']);
       }
     }),
   );
};
