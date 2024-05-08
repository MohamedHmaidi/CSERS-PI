import { Equipe } from './Equipe';
import { Ressource } from './Ressource';
export interface Reservation {
    idReservation: number;
    reservedQuantity: number;
    reservationDate: Date;
    //equipeIntervention: Equipe; 
   // ressource: Ressource; 
    equipeIntervention : Equipe[];
    ressource: Ressource[];

  }
  