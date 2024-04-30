import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TypeIncident } from '../type-incident';
import { TypeIncidentService } from '../type-incident.service';

@Component({
  selector: 'app-add-incident-type',
  templateUrl: './add-incident-type.component.html',
  styleUrls: ['./add-incident-type.component.css']
})
export class AddIncidentTypeComponent implements OnInit {
  newTypeIncident: TypeIncident = new TypeIncident();

  constructor(
    private typeIncidentService: TypeIncidentService,
    private dialogRef: MatDialogRef<AddIncidentTypeComponent>,
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
  }

  addTypeIncident(): void {
    this.typeIncidentService.addTypeIncident(this.newTypeIncident).subscribe(
      response => {
        console.log('Type d\'incident ajouté avec succès:', response);
       
        this.snackBar.open('Type d\'incident ajouté avec succès!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['bg-green-500', 'text-blue'] 
        });
        
        
        this.dialogRef.close();
      },
      error => {
        console.error('Erreur lors de l\'ajout du type d\'incident:', error);
      }
    );
  }
}
