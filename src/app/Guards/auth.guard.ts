import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = Inject(Router);
  const isAuthenticated = false;

  if (isAuthenticated) {
    return true;
  }
  router.Router.navigateByUrl('/login');
  return false;
};
