// ressource.model.ts

import { Reservation } from './Reservation'; 
import { EtatRessource } from './EtatRessource';
import { TypeRessource } from './TypeRessource';
import { User } from './user';

export class Ressource {
  idRessource: number;
  nomRessource: string;
  //typeRessource: string;
  typeRessource: TypeRessource[];
  localisation: string;
  disponibilite: boolean;
  totalQuantite: number;
  reservations: Reservation[];
  archive:boolean;
  etatRessource : EtatRessource[];
  user: User;

 
}

