import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../../core/models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8089/csers/reservation';

  constructor(private httpClient: HttpClient) { }

  getAllReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`${this.baseUrl}/retrieve-all-resservations`);
  }

  retrieveReservation(reservationId: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(`${this.baseUrl}/retrieve-reservation/${reservationId}`);
  }

  modifyReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.put<Reservation>(`${this.baseUrl}/modify-reservation`, reservation);
  }

  affecterRessourceAEquipe(reservation: Reservation, idRessource: number, idEquipe: number): Observable<Reservation> {
    return this.httpClient.post<Reservation>(`${this.baseUrl}/AffecterRessourceAEquipe/${idRessource}/${idEquipe}`, reservation);
  }
}
