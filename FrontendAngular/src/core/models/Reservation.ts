import { Equipe } from './Equipe';
import { Ressource } from './Ressource';
export interface reservation {
    idReservation: number;
    reservedQuantity: number;
    reservationDate: Date;
    equipeIntervention: Equipe; 
    ressource: Ressource; 
  }
  