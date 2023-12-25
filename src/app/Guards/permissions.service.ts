import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { UserResponse } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let user: UserResponse | null = null;

    this.userService.getUser().subscribe((res) => {
      user = res;
    });

    if (user) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}
