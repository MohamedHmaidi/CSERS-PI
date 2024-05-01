import { TypeIncident } from "./type-incident";
export class Incident {
    idIncident: number;
    localisation: string;
    description: string;
    incidentDate: Date;
    status: string;
    latitude: number; 
    longitude: number; 
    typeIncident: TypeIncident;
    id_user: number = 1; 

    constructor() {
        this.id_user = 1;
    }
}
