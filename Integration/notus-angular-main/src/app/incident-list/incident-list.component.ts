import { Component, OnInit } from '@angular/core';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateIncidentComponent } from '../update-incident/update-incident.component';
import { IncidentDetailComponent } from '../incident-detail/incident-detail.component';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  incidents: Incident[];
  currentPage: number = 1;
  pageSize: number = 5; 

  constructor(
    private dialog: MatDialog,
    private incidentService: IncidentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getIncidents();
  }

  private getIncidents() {
    this.incidentService.getIncidentList().subscribe(data => {
      this.incidents = data;
    });
  }

  deleteIncident(incidentId: number) {
    if (confirm('Are you sure you want to delete this incident?')) {
      this.incidentService.deleteIncident(incidentId).subscribe(() => {
        this.incidents = this.incidents.filter(incident => incident.idIncident !== incidentId);

        this.snackBar.open('Incident deleted successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['bg-green-500', 'text-white']
        });
      });
    }
  }

  openUpdateIncidentDialog(incident: Incident): void {
    const dialogRef = this.dialog.open(UpdateIncidentComponent, {
      width: '800px',
      data: { incident }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.updated) {
       
        this.getIncidents();
      }
    });
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  get paginationStart(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get paginationEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.incidents.length);
  }

  get totalPages(): number {
    return Math.ceil(this.incidents.length / this.pageSize);
  }

  navigateToTypeIncidents() {
    this.router.navigate(['/TypeIncidents']);
  }

  openIncidentDetailDialog(incidentId: number): void {
    const dialogRef = this.dialog.open(IncidentDetailComponent, {
      width: '800px',
      data: { incidentId }
    });
  }
}
