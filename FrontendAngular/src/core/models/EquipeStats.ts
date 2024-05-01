// equipe-stats.model.ts

import { Equipe } from './Equipe';
import { Ressource } from './Ressource';

export interface EquipeStats {
  idReservation: number;
  reservedQuantity: number;
  reservationDate: Date;
  equipeIntervention: Equipe;
  ressource: Ressource;
}
