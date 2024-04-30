import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIncidentTypeComponent } from '../add-incident-type/add-incident-type.component';
import { TypeIncident } from '../type-incident';
import { TypeIncidentService } from '../type-incident.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-type-incident-list',
  templateUrl: './type-incident-list.component.html',
  styleUrls: ['./type-incident-list.component.css']
})
export class TypeIncidentListComponent implements OnInit {
  incidents: TypeIncident[];
  
  constructor(
    private typeService: TypeIncidentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getTypeIncidents();
  }

  private getTypeIncidents() {
    this.typeService.getTypeIncidentList().subscribe(data => {
      this.incidents = data;
    });
  }

  deleteTypeIncident(typeIncidentId: number) {
    this.typeService.deleteTypeIncident(typeIncidentId).subscribe(() => {
      this.incidents = this.incidents.filter(incident => incident.idTypeIncident !== typeIncidentId);
      
      this.snackBar.open('Incident deleted successfully!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['bg-green-500', 'text-blue']
      });
    });
  }

  openAddTypeDialog(): void {
    const dialogRef = this.dialog.open(AddIncidentTypeComponent, {
      width: '400px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      this.getTypeIncidents();
    });
  }
}
