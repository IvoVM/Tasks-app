import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { User } from '../types/user.type';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
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

  register(body: User): Observable<any> {
    return this.http.post(environment.apiUrl + '/Users/Register', body);
  }
}
