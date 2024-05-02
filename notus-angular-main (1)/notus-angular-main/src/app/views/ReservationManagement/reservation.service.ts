import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private httpClient: HttpClient) { }

 // constructor() { }
 ListUrl="http://localhost:8089/csers/reservation/retrieve-all-reservations"
 UpdateUrl="http://localhost:8089/csers/reservation/modify-reservation"

 getReservations(): Observable<Reservation[]>{
   return this.httpClient.get<Reservation[]>(`${this.ListUrl}`)}
 
   modifyReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.put<Reservation>(`${this.UpdateUrl}`, reservation);
  
 }

}
