import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenExpiration: Date | null = null;

  constructor(private router: Router, private userSvc: UserService) {}

  setTokenExpiration(expiration: string): void {
    this.tokenExpiration = new Date(expiration);
    this.scheduleExpirationCheck();
  }

  private scheduleExpirationCheck(): void {
    if (this.tokenExpiration) {
      const now = new Date();
      const timeUntilExpiration =
        this.tokenExpiration.getTime() - now.getTime();

      if (timeUntilExpiration > 0) {
        setTimeout(() => this.checkTokenExpiration(), timeUntilExpiration);
      } else {
        this.checkTokenExpiration();
      }
    }
  }

  private checkTokenExpiration(): void {
    const now = new Date();

    if (this.tokenExpiration && now >= this.tokenExpiration) {
      this.userSvc.clearUser();
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else {
      this.scheduleExpirationCheck();
    }
  }
}
