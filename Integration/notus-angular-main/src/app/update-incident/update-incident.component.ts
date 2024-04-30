import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';
import { TypeIncident } from '../type-incident';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-incident',
  templateUrl: './update-incident.component.html',
  styleUrls: ['./update-incident.component.css']
})
export class UpdateIncidentComponent implements OnInit {
  incident: Incident;
  typesIncident: TypeIncident[];

  constructor(
    private dialogRef: MatDialogRef<UpdateIncidentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private incidentService: IncidentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
    this.incident = this.data.incident;
    this.getTypesIncident();
  }

  getTypesIncident(): void {
    this.incidentService.getTypesIncident()
      .subscribe(types => this.typesIncident = types);
  }

  updateIncident(): void {
    this.incidentService.updateIncident(this.incident)
      .subscribe(() => {
        this.snackBar.open('Incident Updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['bg-green-500', 'text-white']
        });
        
        this.dialogRef.close({ updated: true });
      });
  }

  closeDialog(): void {
    
    this.dialogRef.close({ updated: false });
  }
}
