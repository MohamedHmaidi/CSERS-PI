import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/AuthenticationService';
import { Quiz } from '../models/quiz.model'; // Assuming your Quiz model location

@Injectable({ providedIn: 'root' })
export class QuizService {
  private backendUrl = 'http://localhost:8089/csers';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getQuizzes(): Observable<Quiz[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<Quiz[]>(`${this.backendUrl}/quizzes`, { headers });
  }

  getQuizById(id: number): Observable<Quiz> { 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<Quiz>(`${this.backendUrl}/quizzes/${id}`, { headers });
  }

  updateQuiz(quizId: number, updatedQuiz: Quiz): Observable<Quiz> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.put<Quiz>(`${this.backendUrl}/quizzes/${quizId}`, updatedQuiz, { headers });
  }
  
  deleteQuiz(quizId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.delete<void>(`${this.backendUrl}/quizzes/${quizId}`, { headers });
  }  

  createQuiz(newQuiz: Quiz): Observable<Quiz> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.post<Quiz>(`${this.backendUrl}/quizzes`, newQuiz, { headers });
  } 

  getQuizzesByTrainingContentId(trainingContentId: number): Observable<Quiz[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<Quiz[]>(`${this.backendUrl}/quizzes/ByTrainingContent/${trainingContentId}`, { headers });
  }

  // Add the missing methods for statistics
  getMostPopularQuizType(): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get(`${this.backendUrl}/quizzes/statistics/mostPopularQuizType`, { responseType: 'text' , headers });
  }
  

  getTotalQuizzesCount(): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<number>(`${this.backendUrl}/quizzes/statistics/totalQuizzesCount`, { headers });
  }

  getAverageQuizScore(): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<number>(`${this.backendUrl}/quizzes/statistics/averageQuizScore`, { headers });
  }

  getTrainingContentIdByQuizId(quizId: number): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<number>(`${this.backendUrl}/quizzes/${quizId}/trainingContentId`, { headers });
  }

}
