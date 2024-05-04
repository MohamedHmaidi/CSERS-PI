import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/AuthenticationService';
import { QuizQuestion } from '../models/quiz-question.model'; // Your QuizQuestion model

@Injectable({ providedIn: 'root' })
export class QuizQuestionService {
  private backendUrl = 'http://localhost:8089/csers';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getQuestionsByQuizId(quizId: number): Observable<QuizQuestion[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<QuizQuestion[]>(`${this.backendUrl}/quizzes/${quizId}/questions`, { headers });
  }

  getQuestionById(quizId: number, questionId: number): Observable<QuizQuestion> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.get<QuizQuestion>(`${this.backendUrl}/quizzes/${quizId}/questions/${questionId}`, { headers });
  }

  createQuestion(quizId: number, newQuestion: QuizQuestion): Observable<QuizQuestion> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.post<QuizQuestion>(`${this.backendUrl}/quizzes/${quizId}/questions`, newQuestion, { headers });
  }

  updateQuestion(quizId: number, questionId: number, updatedQuestion: QuizQuestion): Observable<QuizQuestion> { 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.put<QuizQuestion>(`${this.backendUrl}/quizzes/${quizId}/questions/${questionId}`, updatedQuestion, { headers });
  }

  deleteQuestion(quizId: number, questionId: number): Observable<void> { 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    return this.http.delete<void>(`${this.backendUrl}/quizzes/${quizId}/questions/${questionId}`, { headers });
  }
}
