import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'http://127.0.0.1:8089/csers/claim'; // Base URL for claims API

  constructor(private http: HttpClient) { }

  // Fetch all claims from the backend
  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiUrl}/retrieve-all-claims`);
  }

  // Add a new claim
  addClaim(claim: Claim): Observable<Claim> {
    claim.user = {id_user: 1};
    claim.date = new Date();
    claim.status = "PENDING";
    return this.http.post<Claim>(`${this.apiUrl}/add-claim`, claim);
  }

  // Retrieve a single claim by ID
  getClaimById(claimId: number): Observable<Claim> {
    return this.http.get<Claim>(`${this.apiUrl}/retrieve-claim/${claimId}`);
  }

  // Update an existing claim
  updateClaim(claim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/modify-claim`, claim);
  }

  // Delete a claim by ID
  deleteClaim(claimId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-claim/${claimId}`);
  }

  // Correct claim spelling
  correctClaim(claimId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/correct-claim/${claimId}`, { responseType: 'text' });
  }

  // Search claims based on the provided query
  searchClaims(query: string): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiUrl}/search-claims/${query}`);
  }

  // Fetch claim type statistics
  getClaimTypeStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/claim-type-statistics`);
  }

  // Fetch claim class statistics
  getClaimClassStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/claim-class-statistics`);
  }
}
