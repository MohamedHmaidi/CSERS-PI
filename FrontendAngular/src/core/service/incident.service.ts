import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/AuthenticationService';
import { Incident } from '../models/incident';
import { TypeIncident } from '../models/type-incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private BaseUrl = 'http://localhost:8089/csers/incident/retrieve-all-incidents';
  private DeleteUrl = 'http://localhost:8089/csers/incident/remove-incident';
  private UpdateUrl = 'http://localhost:8089/csers/incident/modify-incident';
  private getIncById = 'http://localhost:8089/csers/incident/retrieve-incident/';
  private addIncidentUrl = 'http://localhost:8089/csers/incident/add-incident';
  private typesIncidentUrl = 'http://localhost:8089/csers/incidentType/retrieve-all-incidentsTypes';
  private getTypeIncidentByIdUrl = 'http://localhost:8089/csers/incidentType/retrieve-incidentType/';
  private apiUrl = 'http://localhost:8089/csers/incident/incidents-per-day';
  private typesIncidentCountUrl = 'http://localhost:8089/csers/incident/count-by-type';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getIncidentList(): Observable<Incident[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.httpClient.get<Incident[]>(`${this.BaseUrl}`, { headers });
  }

  deleteIncident(incidentId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.httpClient.delete(`${this.DeleteUrl}/${incidentId}`, { headers });
  }

  updateIncident(incident: Incident): Observable<Incident> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.httpClient.put<Incident>(`${this.UpdateUrl}`, incident, { headers });
  }

  addIncident(incident: Incident): Observable<Incident> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.httpClient.post<Incident>(this.addIncidentUrl, incident, { headers });
  }

  getTypesIncident(): Observable<TypeIncident[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.httpClient.get<TypeIncident[]>(this.typesIncidentUrl, { headers });
  }

  getTypeIncidentById(id: number): Observable<TypeIncident> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    const url = `${this.getTypeIncidentByIdUrl}${id}`;
    return this.httpClient.get<TypeIncident>(url, { headers }); 
  }
  
  getIncidentById(id: number): Observable<Incident> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    const url = `${this.getIncById}${id}`;
    return this.httpClient.get<Incident>(url, { headers }); 
  }
  

  getIncidentsPerDay(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.httpClient.get<any>(this.apiUrl , { headers });
  }

  getIncidentsByType(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.httpClient.get<any>(this.typesIncidentCountUrl, { headers });
  }
}
