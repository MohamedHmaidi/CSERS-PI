import { EtatRessource } from "./EtatRessource";
import { TypeRessource } from "./TypeRessource";
import { User } from "./User";
import { Reservation } from "./reservation";

export class Ressource {
    idRessource: number;
    nomRessource: string;
    typeRessource: TypeRessource[];
    archive:boolean;
    localisation:string;
    totalQuantite: number;
    etatRessource : EtatRessource[];
    reservations: Reservation[];
    user: User;

}