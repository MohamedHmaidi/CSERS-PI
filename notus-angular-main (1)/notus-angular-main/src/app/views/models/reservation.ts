import { EquipeIntervention } from "./EquipeIntervention";
import { Ressource } from "./Ressource";

export class Reservation {
    idReservation: number;
    reservedQuantity: number;
    dateReservation: Date;
    equipeIntervention : EquipeIntervention[];
    ressource: Ressource[];
}