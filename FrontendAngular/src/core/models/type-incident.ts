import { Incident } from "./incident";
export class TypeIncident {
  idTypeIncident: number;
  nomTypeIncident: string;
  description: string;
  niveauRisque: number;
  id_plan: number;
  incidents: Incident[]; 

  constructor() {
    this.idTypeIncident = 1;
}
}
