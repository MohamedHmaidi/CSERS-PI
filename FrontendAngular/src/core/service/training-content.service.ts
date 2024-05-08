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

    return this.http.get<TrainingContent[]>(this.backendUrl);
  }

  getTrainingContentById(id: number): Observable<TrainingContent> {
  
    return this.http.get<TrainingContent>(`${this.backendUrl}/${id}`);
  }

  createTrainingContent(trainingContent: TrainingContent): Observable<TrainingContent> {
   
    return this.http.post<TrainingContent>(this.backendUrl, trainingContent);
  }

  updateTrainingContent(id: number, trainingContent: TrainingContent): Observable<TrainingContent> {
    return this.http.put<TrainingContent>(`${this.backendUrl}/${id}`, trainingContent);
  }

  deleteTrainingContent(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.backendUrl}/${id}`);
  }
}
