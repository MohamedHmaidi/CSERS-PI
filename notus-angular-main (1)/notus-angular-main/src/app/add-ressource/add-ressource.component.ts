import { Component, OnInit } from '@angular/core';
import { Ressource } from 'src/app/models/Ressource';
import { RessourceService } from '../views/ressource.service'; 
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
  ressource: Ressource = new Ressource(); 

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
  
  const newRessource: Ressource = {
    nomRessource: this.ressource.nomRessource,
    typeRessource: this.ressource.typeRessource,
    localisation: this.ressource.localisation,
    totalQuantite: this.ressource.totalQuantite,
    etatRessource: this.ressource.etatRessource
  } as Ressource;


 
  //this.ressourceService.addRessource(newRessource)
    //.subscribe(() => {
      
      //this.snackBar.open('Ressource added successfully!', 'Close', {
        //duration: 3000,
        //verticalPosition: 'top',
        //panelClass: ['bg-green-500', 'text-white']
      //});
      
      //this.router.navigate(['/ressource']); 
    //});
  }
}