import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { User, UserLogin, UserResponse } from '../../../types/user.type';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(body: UserLogin): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      environment.apiUrl + '/Users/Login',
      body
    );
  }

  register(body: User): Observable<any | null> {
    return this.http.post(environment.apiUrl + '/Users/Register', body);
  }

  checkEmailInUse(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams().set('email', email);
    return this.http.get(environment.apiUrl + '/Users/ValidateEmail', {
      headers,
      params,
    });
  }
}
