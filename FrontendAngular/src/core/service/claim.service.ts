import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim.model';
import { AuthService } from './AuthenticationService';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'http://127.0.0.1:8089/csers/claim'; // Base URL for claims API

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Fetch all claims from the backend
  getClaims(): Observable<Claim[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<Claim[]>(`${this.apiUrl}/retrieve-all-claims`, { headers });
  }

  // Add a new claim
  addClaim(claim: Claim): Observable<Claim> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    claim.user = {id_user: 1};
    claim.date = new Date();
    claim.status = "PENDING";
    return this.http.post<Claim>(`${this.apiUrl}/add-claim`, claim,  { headers });
  }

  // Retrieve a single claim by ID
  getClaimById(claimId: number): Observable<Claim> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<Claim>(`${this.apiUrl}/retrieve-claim/${claimId}`,  { headers });
  }

  // Update an existing claim
  updateClaim(claim: Claim): Observable<Claim> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.put<Claim>(`${this.apiUrl}/modify-claim`, claim,  { headers });
  }

  // Delete a claim by ID
  deleteClaim(claimId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.delete<void>(`${this.apiUrl}/remove-claim/${claimId}`,  { headers });
  }

  // Correct claim spelling
  correctClaim(claimId: number): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get(`${this.apiUrl}/correct-claim/${claimId}`, { responseType: 'text' , headers});
  }

  // Search claims based on the provided query
  searchClaims(query: string): Observable<Claim[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<Claim[]>(`${this.apiUrl}/search-claims/${query}`,  { headers });
  }

  // Fetch claim type statistics
  getClaimTypeStatistics(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<any>(`${this.apiUrl}/claim-type-statistics`,  { headers });
  }

  // Fetch claim class statistics
  getClaimClassStatistics(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<any>(`${this.apiUrl}/claim-class-statistics`,  { headers });
  }
}
