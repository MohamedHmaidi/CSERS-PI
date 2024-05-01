import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Incident } from '../../core/models/incident';
import { AuthService } from '../service/AuthenticationService';
import { TypeIncident } from '../../core/models/type-incident';
@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private BaseUrl='http://localhost:8089/csers/incident/retrieve-all-incidents'
  private DeleteUrl='http://localhost:8089/csers/incident/remove-incident'
  private UpdateUrl='http://localhost:8089/csers/incident/modify-incident'
  private getIncById='http://localhost:8089/csers/incident/retrieve-incident/'
  private addIncidentUrl='http://localhost:8089/csers/incident/add-incident'
  private typesIncidentUrl = 'http://localhost:8089/csers/incidentType/retrieve-all-incidentsTypes';
  private getTypeIncidentByIdUrl ='http://localhost:8089/csers/incidentType/retrieve-incidentType/'

  constructor(private httpClient: HttpClient, private authService: AuthService) { }
  getIncidentList(): Observable<Incident[]>{return this.httpClient.get<Incident[]>(`${this.BaseUrl}`)}

  deleteIncident(incidentId: number): Observable<any> {
    return this.httpClient.delete(`${this.DeleteUrl}/${incidentId}`);
  }

  updateIncident(incident: Incident): Observable<Incident> {
    return this.httpClient.put<Incident>(`${this.UpdateUrl}`, incident);
  }

  addIncident(incident: Incident): Observable<Incident> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.httpClient.post<Incident>(this.addIncidentUrl, incident, { headers });
  }
  
  
}
