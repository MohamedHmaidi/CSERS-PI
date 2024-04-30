import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingContent } from '../quiz/training-content.model'; 

@Injectable({
  providedIn: 'root'
})
export class TrainingContentService {
  private backendUrl = 'http://localhost:8080/api/training-content'; 

  constructor(private http: HttpClient) { }

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
