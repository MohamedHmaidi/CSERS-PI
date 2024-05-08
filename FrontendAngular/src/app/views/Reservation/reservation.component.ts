import { Component, OnInit } from '@angular/core';
import { RessourceService } from '../../../core/service/ressource.service';
import { Ressource } from '../../../core/models/Ressource';
import { TypeRessource } from '../../../core/models/TypeRessource';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  resources: Ressource[];

  constructor(private reservationService: RessourceService) { }

  ngOnInit(): void {
    this.getRessourcesFromBackend();
  }

  getRessourcesFromBackend() {
    this.reservationService.getRessourcesBack().subscribe((data: Ressource[]) => {
      // Assign the fetched type directly to the typeRessource property of each resource
      this.resources = data.map(resource => ({
        ...resource,
        typeRessource: resource.typeRessource
      }));
    });
  }

  ReserveResource(resource: Ressource) {
    // Implement reserve logic
  }
}
