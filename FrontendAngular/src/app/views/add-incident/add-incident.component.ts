import { Component, OnInit } from '@angular/core';
import { Incident } from '../../../core/models/incident';
import { TypeIncident } from '../../../core/models/type-incident';
import { NotificationService } from '../../../core/service/NotificationService';
import { IncidentService } from '../../../core/service/incident.service';
import { MessagingService } from '../../../core/service/messaging.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {
  typesIncident: TypeIncident[];
  incident: Incident = new Incident(); 

  // Static property to hold idTypeIncident
  static idTypeIncident: number = 1;

  constructor(private incidentService: IncidentService, private router: Router, private messagingService: MessagingService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.enableNotifications(); 
    
  }

  addIncident(): void {
    if (!this.incident.localisation) {
      console.error('Please fill in all required fields!');
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
    // Create a placeholder TypeIncident object
    const typeIncident: TypeIncident = {
      idTypeIncident: AddIncidentComponent.idTypeIncident,
      nomTypeIncident: 'Placeholder',
      description: 'Placeholder description',
      niveauRisque: 1,
      id_plan: 1,
      incidents: []
    };
    
    // Assign the placeholder TypeIncident object to incident
    this.incident.typeIncident = typeIncident;
   
    this.incidentService.addIncident(this.incident)
      .subscribe(() => {
        console.log('Incident added successfully!');
       
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
