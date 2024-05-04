import { Component, OnInit } from '@angular/core';
import { Incident } from '../../../core/models/incident';
import { TypeIncident } from '../../../core/models/type-incident';
import { IncidentService } from '../../../core/service/incident.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/service/NotificationService';
import { MessagingService } from '../../../core/service/messaging.service';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {
  typesIncident: TypeIncident[];
  incident: Incident = new Incident(); 

  constructor(private incidentService: IncidentService, private snackBar: MatSnackBar, private router: Router
    , private messagingService: MessagingService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getTypesIncident();
    this.enableNotifications(); 
  }

  getTypesIncident(): void {
    this.incidentService.getTypesIncident()
      .subscribe(types => this.typesIncident = types);
  }

  addIncident(): void {
    if (!this.incident.typeIncident || !this.incident.localisation) {
      this.snackBar.open('Please fill in all required fields!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['bg-red-500', 'text-white']
      });
      return;
    }

    this.incident.status = 'IN_PROGRESS';

    if (this.incident.localisation === 'ESB') {
      this.incident.latitude = 36.89936386868179;
      this.incident.longitude = 10.189520098104273;
    } else if (this.incident.localisation === 'ESPRIT') {
      this.incident.latitude = 36.899150148813824;
      this.incident.longitude = 10.189259470361218;
    } else if (this.incident.localisation === 'ANOTHER') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            
            this.incident.latitude = latitude;
            this.incident.longitude = longitude;
            
            this.addIncidentToService();
          },
          error => {
            console.error('Error getting geolocation:', error);
            this.snackBar.open('Error getting geolocation!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['bg-red-500', 'text-white']
            });
          },
          {
            enableHighAccuracy: true 
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
      
      return; 
    }

    this.addIncidentToService();
  }

  enableNotifications() {
    this.messagingService.requestPermission();
  }


  addIncidentToService(): void {
    this.incidentService.addIncident(this.incident)
      .subscribe(() => {
        this.snackBar.open('Incident added successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['bg-green-500', 'text-white']
        });
        this.router.navigate(['/incidents']); 
      });
  }

  sendTestNotification() {
    const title = this.incident.description; 
    const body = `Localization: ${this.incident.localisation}`; 
    const deviceToken = 'YOUR_DEVICE_TOKEN'; 

    console.log('Sending test notification...');
    this.notificationService.sendNotification(deviceToken, title, body)
      .subscribe(response => {
        console.log('Notification sent successfully:', response);
        console.log('Displaying desktop notification...');
        this.notificationService.displayNotification(title, body, 'assets/img/1022323.png', '/admin/listequipe');
      }, error => {
        console.error('Error sending notification:', error);
      });
  }

}
