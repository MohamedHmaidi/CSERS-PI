import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css']
})
export class IncidentDetailComponent implements OnInit {
  incident: Incident;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.getIncidentDetails(this.data.incidentId);
  }

  getIncidentDetails(incidentId: number): void {
    this.incidentService.getIncidentById(incidentId)
      .subscribe(incident => {
        this.incident = incident;
        if (this.incident.latitude && this.incident.longitude) {
          this.initMap();
        }
      });
  }

  initMap(): void {
    const map = L.map('map').setView([this.incident.latitude, this.incident.longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    const marker = L.marker([this.incident.latitude, this.incident.longitude], {
      icon: L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        popupAnchor: [0, -41]
      })
    }).addTo(map);
  
    marker.bindPopup(`<b>Incident is Here</b>`).openPopup();
  }
}
