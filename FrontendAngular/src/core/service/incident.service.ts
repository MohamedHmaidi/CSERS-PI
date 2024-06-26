import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../../core/models/incident';
import { TypeIncident } from '../../core/models/type-incident';
import { AuthService } from './AuthenticationService';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private BaseUrl = 'http://localhost:8089/csers/incident/retrieve-all-incidents';
  private DeleteUrl = 'http://localhost:8089/csers/incident/remove-incident';
  private UpdateUrl = 'http://localhost:8089/csers/incident/modify-incident';
  private getIncById = 'http://localhost:8089/csers/incident/retrieve-incident/';
  private addIncidentUrl = 'http://localhost:8089/csers/incident/add-incidentrec';
  private typesIncidentUrl = 'http://localhost:8089/csers/incidentType/retrieve-all-incidentsTypes';
  private getTypeIncidentByIdUrl = 'http://localhost:8089/csers/incidentType/retrieve-incidentType/';
  private apiUrl = 'http://localhost:8089/csers/incident/incidents-per-day';
  private typesIncidentCountUrl = 'http://localhost:8089/csers/incident/count-by-type';
  private userId = 0;

  constructor(private httpClient: HttpClient, private authService:AuthService) { }

  getIncidentList(): Observable<Incident[]> {
    return this.httpClient.get<Incident[]>(`${this.BaseUrl}`);
  }

  deleteIncident(incidentId: number): Observable<any> {
    return this.httpClient.delete(`${this.DeleteUrl}/${incidentId}`);
  }

  updateIncident(incident: Incident): Observable<Incident> {
    return this.httpClient.put<Incident>(`${this.UpdateUrl}`, incident);
  }

  addIncident(incident: Incident): Observable<Incident> {
    const userId = this.authService.getCurrentUser().userId.toString(); // Convert to string
    
    // You can set up headers if needed
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.getCurrentUserToken(),
        'UserId': userId
    });

    // Passing options as third parameter
    const options = { headers: headers };

    return this.httpClient.post<Incident>(this.addIncidentUrl, incident, options);
}

  getTypesIncident(): Observable<TypeIncident[]> {
    return this.httpClient.get<TypeIncident[]>(this.typesIncidentUrl);
  }

  getTypeIncidentById(id: number): Observable<TypeIncident> {
    const url = `${this.getTypeIncidentByIdUrl}${id}`;
    return this.httpClient.get<TypeIncident>(url);
  }

  getIncidentById(id: number): Observable<Incident> {
    const url = `${this.getIncById}${id}`;
    return this.httpClient.get<Incident>(url);
  }

  getIncidentsPerDay(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl);
  }

  getIncidentsByType(): Observable<any> {
    return this.httpClient.get<any>(this.typesIncidentCountUrl);
  }
}
