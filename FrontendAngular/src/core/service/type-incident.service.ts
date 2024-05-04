import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../service/AuthenticationService';
import { TypeIncident } from '../models/type-incident';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TypeIncidentService {

  ListUrl="http://localhost:8089/csers/incidentType/retrieve-all-incidentsTypes"
  DeleteUrl="http://localhost:8089/csers/incidentType/remove-incidentType"
  addTypeUrl="http://localhost:8089/csers/incidentType/add-incidentType"
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getTypeIncidentList(): Observable<TypeIncident[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.httpClient.get<TypeIncident[]>(`${this.ListUrl}`, { headers })}
  
  deleteTypeIncident(TypeincidentId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.httpClient.delete(`${this.DeleteUrl}/${TypeincidentId}`, { headers });
  }

  addTypeIncident(Typeincident: TypeIncident): Observable<TypeIncident> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.httpClient.post<TypeIncident>(this.addTypeUrl, Typeincident, { headers });
  }

}
