import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/AuthenticationService';
import { TrainingContent } from '../models/training-content.model'; 

@Injectable({
  providedIn: 'root'
})
export class TrainingContentService {
  private backendUrl = 'http://localhost:8089/csers/training-content'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTrainingContents(): Observable<TrainingContent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<TrainingContent[]>(this.backendUrl, { headers });
  }

  getTrainingContentById(id: number): Observable<TrainingContent> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<TrainingContent>(`${this.backendUrl}/${id}`, { headers });
  }

  createTrainingContent(trainingContent: TrainingContent): Observable<TrainingContent> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.post<TrainingContent>(this.backendUrl, trainingContent, { headers });
  }

  updateTrainingContent(id: number, trainingContent: TrainingContent): Observable<TrainingContent> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.put<TrainingContent>(`${this.backendUrl}/${id}`, trainingContent, { headers });
  }

  deleteTrainingContent(id: number): Observable<void> { 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.delete<void>(`${this.backendUrl}/${id}`, { headers });
  }
}
