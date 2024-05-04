import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClaimResponse } from '../models/response.model';
import { AuthService } from './AuthenticationService';
import { Claim } from '../models/claim.model';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private apiUrl = 'http://127.0.0.1:8089/csers/response'; // Base URL for responses API

  constructor(private http: HttpClient , private authService: AuthService) { }

  // Fetch all responses from the backend
  getResponses(): Observable<ClaimResponse[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<ClaimResponse[]>(`${this.apiUrl}/retrieve-all-responses` , { headers });
  }

  // Add a new response
  addResponse(response: ClaimResponse, claim: Claim): Observable<ClaimResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    response.user = {id_user: 1};
    response.date = new Date();
    response.claim = claim
    return this.http.post<ClaimResponse>(`${this.apiUrl}/add-response`, response , { headers });
  }

  // Retrieve a single response by ID
  getResponseById(responseId: number): Observable<ClaimResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<ClaimResponse>(`${this.apiUrl}/retrieve-response/${responseId}`, { headers });
  }

  // Update an existing response
  updateResponse(response: ClaimResponse): Observable<ClaimResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.put<ClaimResponse>(`${this.apiUrl}/modify-response`, response, { headers });
  }

  // Delete a response by ID
  deleteResponse(responseId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.delete<void>(`${this.apiUrl}/remove-response/${responseId}`, { headers });
  }
}
