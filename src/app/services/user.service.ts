import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserResponse } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<UserResponse | null>(null);

  getUser() {
    return this.userSubject.asObservable();
  }

  setUser(user: UserResponse) {
    this.userSubject.next(user);
    console.log(user);
  }

  clearUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token_expires');
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }
}
