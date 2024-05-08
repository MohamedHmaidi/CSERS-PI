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

    return this.http.get<ClaimResponse[]>(`${this.apiUrl}/retrieve-all-responses` );
  }

  // Add a new response
  addResponse(response: ClaimResponse, claim: Claim): Observable<ClaimResponse> {
    response.user = {id_user: this.authService.getCurrentUser().userId};
    response.date = new Date();
    response.claim = claim
    console.log(response);
    return this.http.post<ClaimResponse>(`${this.apiUrl}/add-response`, response );
  }

  // Retrieve a single response by ID
  getResponseById(responseId: number): Observable<ClaimResponse> {
  
    return this.http.get<ClaimResponse>(`${this.apiUrl}/retrieve-response/${responseId}`);
  }

  // Update an existing response
  updateResponse(response: ClaimResponse): Observable<ClaimResponse> {

    return this.http.put<ClaimResponse>(`${this.apiUrl}/modify-response`, response);
  }

  // Delete a response by ID
  deleteResponse(responseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-response/${responseId}`);
  }
}
