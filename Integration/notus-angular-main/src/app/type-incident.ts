import { Incident } from "./incident";
export class TypeIncident {
  idTypeIncident: number;
  nomTypeIncident: string;
  description: string;
  niveauRisque: number;
  planUrgence: string;
  incidents: Incident[]; 
}
