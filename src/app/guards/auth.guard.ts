import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../todo-list/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if  (authService.isAuth()) {
    return true;
  }else{
    const urlTreeReturn = router.createUrlTree(['/login']);
    return urlTreeReturn;
  }
  
};
