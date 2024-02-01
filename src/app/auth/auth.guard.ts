import {
  CanActivateFn,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const Authservice: AuthService = inject(AuthService);

  //Taking the boolean valor from AuthService
  //LOGGED & SIGNUP propreties
  const isAuthenticated = Authservice.logged;
  const isSignedUp = Authservice.signup;

  if (isAuthenticated && isSignedUp) {
    // Navigate to the lgin page if not authenticated
    //console.log('logged');
    return true;
  }
  if (isSignedUp) {
    // router.navigate(['/login']);
    //console.log('registrato');
    return true;
  } else {
    //console.log('not logged');
    return false;
  }
};
