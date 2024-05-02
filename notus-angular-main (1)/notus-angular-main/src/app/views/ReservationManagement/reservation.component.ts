import { Component, OnInit } from '@angular/core';
import { ReservationService } from './reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getReservations()
      .subscribe(reservations => this.reservations = reservations);
  }

  modifyReservation(reservation: Reservation): void {
    this.reservationService.modifyReservation(reservation)
      .subscribe(updatedReservation => {
        // Handle the updated reservation if needed
      });
  }
}