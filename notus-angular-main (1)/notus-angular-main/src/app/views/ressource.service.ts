import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ressource } from 'src/app/models/Ressource';


@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  private baseURL = "http://localhost:8089/csers/ressource";

  constructor(private httpClient: HttpClient) { }
  
  getRessourcesBack(): Observable<Ressource[]>{
    return this.httpClient.get<Ressource[]>(`${this.baseURL}`+"/retrieve-all-ressources-back");
  }
  archiveRessource(ressource:Ressource):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}`+"/archive-ressource",ressource);

  }
  retrieveRessource(idRessource: number): Observable<Ressource>{
    return this.httpClient.get<Ressource>(`${this.baseURL}`+"/retrieve-ressource/"+`${idRessource}`);
  }


  addRessource(ressource: Ressource): Observable<Ressource> {
    return this.httpClient.post<Ressource>(`${this.baseURL}`+"/add-ressource/1",ressource);
  }
  modifyRessource(ressource: Ressource): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}` + "/modify-ressource", ressource);
  }

  statisticsUsedTypeRessource(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}` + "/statistics");
  }

}