import { SafeUrl } from '@angular/platform-browser';
import { Equipe } from './Equipe';

export interface Membre {
    idMembre: number;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    imageFile: File;
    poste: string;
    number: string;
    competencesTechniques: string;
    certifications: string;
    experience: number;
    equipeInterventionId: number;
   
 
    
}
