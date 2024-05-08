import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/AuthenticationService';


@Injectable({
    providedIn: 'root'
  })
  export class SearchService {
    private apiUrl = 'http://localhost:8089/csers/membres/search'; 
  
    constructor(private http: HttpClient, private authService: AuthService) { }
  
    search(query: any): Observable<any> {

      let params = new HttpParams();
      if (query.poste) {
        params = params.set('poste', query.poste);
      }
      if (query.competencesTechniques) {
        params = params.set('competencesTechniques', query.competencesTechniques);
      }
      if (query.certifications) {
        params = params.set('certifications', query.certifications);
      }
  
      const options = { params };
  
      return this.http.get<any[]>(this.apiUrl, options);
    }
  }
  
