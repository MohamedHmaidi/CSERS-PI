// ressource.model.ts

import { reservation } from './Reservation'; // Assurez-vous d'avoir une classe Reservation correspondante

export class Ressource {
  idRessource: number;
  nomRessource: string;
  typeRessource: string;
  localisation: string;
  disponibilite: boolean;
  totalQuantite: number;
  reservations: reservation[];

  constructor(
    idRessource: number,
    nomRessource: string,
    typeRessource: string,
    localisation: string,
    disponibilite: boolean,
    totalQuantite: number,
    reservations: reservation[]
  ) {
    this.idRessource = idRessource;
    this.nomRessource = nomRessource;
    this.typeRessource = typeRessource;
    this.localisation = localisation;
    this.disponibilite = disponibilite;
    this.totalQuantite = totalQuantite;
    this.reservations = reservations;
  }
}

