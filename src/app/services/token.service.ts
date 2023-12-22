import { Injectable } from '@angular/core';
import { UserResponse } from '../types/user.type';

const TOKEN_KEY = 'token';
const EXPIRATION_DATE_KEY = 'expirationDate';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(user: UserResponse) {
    if (user) {
      const { access_token_expiration } = user;
      this.saveTokenExpirationDate(new Date(access_token_expiration).getTime());
    }
  }

  saveTokenExpirationDate(expirationTime: number) {
    const expireDate = new Date(expirationTime);
    const saveExpireDate = JSON.stringify(expireDate);
    localStorage.setItem(EXPIRATION_DATE_KEY, saveExpireDate);
  }

  tokenIsExpired(): boolean {
    const expireDateSaved = localStorage.getItem(EXPIRATION_DATE_KEY);

    if (expireDateSaved) {
      const expireDate = new Date(JSON.parse(expireDateSaved));
      const currentDate = new Date();
      console.log(currentDate, expireDate);

      return currentDate >= expireDate;
    }

    console.log('There is no expiration date available');
    return true;
  }
}
