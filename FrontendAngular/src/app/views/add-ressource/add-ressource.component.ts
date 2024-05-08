import { Component, OnInit } from '@angular/core';
import { Ressource } from '../../../core/models/Ressource';
import { RessourceService } from '../../../core/service/ressource.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.css']
})
export class AddRessourceComponent implements OnInit {
  newRessource: Ressource = new Ressource();
  typeRessources: string[] = []; // Add the available type options
  etatRessources: string[] = []; // Add the available etat options

  constructor(private ressourceService: RessourceService, private router: Router) { }

  ngOnInit(): void {
    this.typeRessources = ['DISPOSITIFS','POMMADES','SIROP','PENSEMENTS','DESINFECTANT','VITAMINES','MEDICAMENTS'];
    this.etatRessources = ['DISPONIBLE','HORS_SERVICE','NON_DISPONIBLE'];
  }

  addRessource() {
    this.ressourceService.addRessource(this.newRessource).subscribe(
      (data: Ressource) => {
        console.log('Ressource added:', data);
        this.newRessource = new Ressource();
        this.router.navigate(['/ressource']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
