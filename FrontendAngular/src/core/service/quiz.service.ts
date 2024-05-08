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

    return this.http.get<Quiz[]>(`${this.backendUrl}/quizzes`);
  }

  getQuizById(id: number): Observable<Quiz> { 

    return this.http.get<Quiz>(`${this.backendUrl}/quizzes/${id}`);
  }

  updateQuiz(quizId: number, updatedQuiz: Quiz): Observable<Quiz> {

    return this.http.put<Quiz>(`${this.backendUrl}/quizzes/${quizId}`, updatedQuiz);
  }
  
  deleteQuiz(quizId: number): Observable<void> {

    return this.http.delete<void>(`${this.backendUrl}/quizzes/${quizId}`);
  }  

  createQuiz(newQuiz: Quiz): Observable<Quiz> {

    return this.http.post<Quiz>(`${this.backendUrl}/quizzes`, newQuiz);
  } 

  getQuizzesByTrainingContentId(trainingContentId: number): Observable<Quiz[]> {

    return this.http.get<Quiz[]>(`${this.backendUrl}/quizzes/ByTrainingContent/${trainingContentId}`);
  }

  // Add the missing methods for statistics
  getMostPopularQuizType(): Observable<string> {
    return this.http.get(`${this.backendUrl}/quizzes/statistics/mostPopularQuizType`, { responseType: 'text'  });
  }
  

  getTotalQuizzesCount(): Observable<number> {
    return this.http.get<number>(`${this.backendUrl}/quizzes/statistics/totalQuizzesCount`);
  }

  getAverageQuizScore(): Observable<number> {
    return this.http.get<number>(`${this.backendUrl}/quizzes/statistics/averageQuizScore`);
  }

  getTrainingContentIdByQuizId(quizId: number): Observable<number> {
    return this.http.get<number>(`${this.backendUrl}/quizzes/${quizId}/trainingContentId`);
  }

}
