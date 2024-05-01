import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationResponse } from '../models/AuthenticationResponse';
import { RegisterRequest } from '../models/RegisterRequest';
import { AuthenticationRequest } from '../models/AuthenticationRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8089/csers/api/v1/auth'; 
  private accessTokenKey = 'access_token';
  private userIdKey = 'user_id';

  constructor(private http: HttpClient) { }

  private saveTokenAndUserId(token: string, userId: number): void {
    console.log('Saving access token and user ID:', token, userId);
    localStorage.setItem(this.accessTokenKey, token);
    localStorage.setItem(this.userIdKey, userId.toString());
    console.log('Saved access token and user ID:', localStorage.getItem(this.accessTokenKey), localStorage.getItem(this.userIdKey));
  }

  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/register`, request)
      .pipe(
        tap(response => this.saveTokenAndUserId(response.access_token, response.user_id))
      );
  }

  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request)
      .pipe(
        tap(response => {
          console.log('Response from backend:', response); 
          this.saveTokenAndUserId(response.access_token, response.user_id); 
        })
      );
  }

  refreshToken(): Observable<void> {
    console.log('Refreshing access token...');
    return this.http.post<void>(`${this.baseUrl}/refresh-token`, null);
  }

  getAccessToken(): string | null {
    const token = localStorage.getItem(this.accessTokenKey);
    console.log('Retrieved access token:', token);
    return token;
  }

  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    console.log('Retrieved user ID:', userId);
    return userId ? parseInt(userId, 10) : null;
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.userIdKey);
  }
}