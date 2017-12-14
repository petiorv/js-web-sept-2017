import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Router,
  Route
} from '@angular/router';

import { AuthenticationService } from '../components/authentication/auth.service';
import { AdminService } from '../core/services/admin/admin.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService : AuthenticationService,
    private router : Router,
    private adminService: AdminService
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }
  
  checkLoggedIn(url : string) : boolean {
    if (this.adminService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}