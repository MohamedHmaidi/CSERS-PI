import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/AuthenticationService';
import { Membre } from '../models/Membre';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MembreService {
  private apiUrl = 'http://localhost:8089/csers/membres';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllMembres(): Observable<Membre[]> {

    return this.http.get<Membre[]>(`${this.apiUrl}/getall`).pipe(
      catchError((error) => {
        console.error('Error retrieving all membres:', error);
        throw error;
      })
    );
  }

  getMembreById(id: number): Observable<Membre> {

    return this.http.get<Membre>(`${this.apiUrl}/getMembreById/${id}` );
  }

  getMembersByEquipeId(equipeId: number): Observable<Membre[]> {

    return this.http.get<Membre[]>(`${this.apiUrl}/byEquipeId/${equipeId}`);
  }

  
  createMembreWithImage(membre: Membre): Observable<Membre> {
    const formData = new FormData();
    formData.append('poste', membre.poste);
    formData.append('number', membre.number);
    formData.append('competencesTechniques', membre.competencesTechniques);
    formData.append('certifications', membre.certifications);
    formData.append('experience', membre.experience ? membre.experience.toString() : '');
    formData.append('equipeInterventionId', membre.equipeInterventionId.toString());
    formData.append('imageFile', membre.imageFile);

    return this.http.post<Membre>(`${this.apiUrl}/createmembre`, formData);
  }

  getRecommendedTeamsByPoste(poste: string): Observable<string[]> {

    return this.http.get<string[]>(`${this.apiUrl}/recommend-teams?poste=${poste}`).pipe(
      catchError((error) => {
        console.error('Error retrieving recommended teams:', error);
        throw error;
      })
    );
  }

  updateMembreEquipe(memberId: number, equipeName: string): Observable<void> {

    return this.http.put<void>(`${this.apiUrl}/${memberId}/updateEquipe/${equipeName}`, {})
      .pipe(
        tap(() => console.log(`Member's equipe updated successfully`)),
        catchError((error) => {
          console.error('Error updating member equipe:', error);
          throw error;
        })
      );
  }

 

  deleteMembre(id: number): Observable<string> {

    return this.http.delete<string>(`${this.apiUrl}/delete/${id}` );
  }

  updateMembre(id: number, membre: Membre): Observable<Membre> {
    return this.http.put<Membre>(`${this.apiUrl}/update/${id}`, membre).pipe(
      catchError((error) => {
        console.error('Error updating member:', error);
        throw error;
      })
    );
  }

}
