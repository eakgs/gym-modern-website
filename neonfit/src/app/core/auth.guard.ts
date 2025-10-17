import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (_route, state) => {
  const token = localStorage.getItem('neonfit:token');
  if (token) return true;
  const router = inject(Router);
  return router.createUrlTree(['/signin'], { queryParams: { returnUrl: state.url } });
};
