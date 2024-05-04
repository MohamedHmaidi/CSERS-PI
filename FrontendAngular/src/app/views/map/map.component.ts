import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;

  ngOnInit(): void {
    this.map = L.map('map').setView([0, 0], 13); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          this.map.setView([latitude, longitude], 13); 
          L.marker([latitude, longitude], {
            icon: L.icon({
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              popupAnchor: [0, -41]
            })
          }).addTo(this.map); 
          console.log(latitude, longitude); 
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
  }
}
