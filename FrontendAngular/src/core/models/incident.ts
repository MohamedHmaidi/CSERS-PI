import { TypeIncident } from "./type-incident";
import { User } from "./user";
export class Incident {
    idIncident: number;
    localisation: string;
    description: string;
    incidentDate: Date;
    status: string;
    latitude: number; 
    longitude: number; 
    user: User
    typeIncident: TypeIncident;
}
