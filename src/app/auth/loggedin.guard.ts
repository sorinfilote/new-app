import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoggedinGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ){ }

  canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue();
    if (!currentUser) {
      return true;
    }

    this.router.navigate(['/boards']);
    return false;
  }

}
