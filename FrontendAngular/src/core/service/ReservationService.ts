// equipe-stats.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/AuthenticationService';
import { EquipeStats } from '../models/EquipeStats';

@Injectable({
  providedIn: 'root',
})
export class EquipeStatsService {
  private apiUrl = 'http://localhost:8089/csers/reservation/stats';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getEquipeStats(year: number, month: number): Observable<EquipeStats[]> {

    return this.http.get<EquipeStats[]>(`${this.apiUrl}?year=${year}&month=${month}`);
  }
}
