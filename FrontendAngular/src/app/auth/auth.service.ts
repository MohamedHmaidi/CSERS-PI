import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface RegisterResponse { } // Define if needed

interface LoginResponse {
  access_token: string;
  id_user: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string; // Include the role in the login response
}

 export interface User {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrll = environment.apiUrl + 'forgetpassword/'; 
  private apiUrl = environment.apiUrl + 'auth/'; 
  
  
  private currentUserSubject: BehaviorSubject<User | null>; // Keep track of Current User

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUserFromStorage());
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}allUser`);
  }

  register(data: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrl + 'register', data);
  }

  login(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl + 'login', data);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}updateID/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}delete/${id}`);
  }

  storeCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user); 
  }

  getCurrentUser(): User | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}getUserById/${userId}`);
  }

  getCurrentUserFromStorage(): User | null {
    const userString = localStorage.getItem('user'); 
    return userString ? JSON.parse(userString) : null; 
  }

  verifyEmail(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrll}verifyMail/${email}`, {});
  }

  verifyOTP(otp: number, email: string): Observable<string> {
    console.log(otp,email);
    return this.http.post<string>(`${this.apiUrll}verify0tp/${otp}/${email}`, {});
  }

  changePassword(email: string, changePassword: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrll}changePassword/${email}/${changePassword}`,{});
  }


  updateUserRole(userId: number, newRole: string): Observable<User> {
    console.log("Updating user role - Request Payload:", { userId, newRole });
    const url = `${this.apiUrl}changeRole`;
    return this.http.put<User>(url, { userId, newRole }); // Use 'newRole' instead of 'role'
  }

  updateUserInfo(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}updateID/${id}`, user);
  }  

  getUserStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}stats`);
  }
}