import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeIncident } from './type-incident';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TypeIncidentService {

  ListUrl="http://localhost:8089/csers/incidentType/retrieve-all-incidentsTypes"
  DeleteUrl="http://localhost:8089/csers/incidentType/remove-incidentType"
  addTypeUrl="http://localhost:8089/csers/incidentType/add-incidentType"
  constructor(private httpClient: HttpClient) { }

  getTypeIncidentList(): Observable<TypeIncident[]>{
    return this.httpClient.get<TypeIncident[]>(`${this.ListUrl}`)}
  
  deleteTypeIncident(TypeincidentId: number): Observable<any> {
    return this.httpClient.delete(`${this.DeleteUrl}/${TypeincidentId}`);
  }

  addTypeIncident(Typeincident: TypeIncident): Observable<TypeIncident> {
    return this.httpClient.post<TypeIncident>(this.addTypeUrl, Typeincident);
  }

}
