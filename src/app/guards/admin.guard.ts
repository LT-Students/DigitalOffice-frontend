import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(
    private userService: UserService,
    private router: Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (this.userService.isAdmin()) {
        return true;
      }
      else {
        this.router.navigate(['/user/attendance'])
        return false;
      }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isAdmin()) {
      return true;
    }
    else {
      this.router.navigate(['/user/attendance'])
      return false;
    }
  }
}
