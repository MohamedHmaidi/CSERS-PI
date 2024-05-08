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

    return this.http.get<QuizQuestion[]>(`${this.backendUrl}/quizzes/${quizId}/questions`);
  }

  getQuestionById(quizId: number, questionId: number): Observable<QuizQuestion> {

    return this.http.get<QuizQuestion>(`${this.backendUrl}/quizzes/${quizId}/questions/${questionId}`);
  }

  createQuestion(quizId: number, newQuestion: QuizQuestion): Observable<QuizQuestion> {

    return this.http.post<QuizQuestion>(`${this.backendUrl}/quizzes/${quizId}/questions`, newQuestion);
  }

  updateQuestion(quizId: number, questionId: number, updatedQuestion: QuizQuestion): Observable<QuizQuestion> { 

    return this.http.put<QuizQuestion>(`${this.backendUrl}/quizzes/${quizId}/questions/${questionId}`, updatedQuestion);
  }

  deleteQuestion(quizId: number, questionId: number): Observable<void> { 

    return this.http.delete<void>(`${this.backendUrl}/quizzes/${quizId}/questions/${questionId}`);
  }
}
