import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chart: any;
  barChart: any;

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.incidentService.getIncidentsPerDay().subscribe((data: { [key: string]: number }) => {
      const dates = Object.keys(data).sort(); 
      const counts = dates.map(date => data[date]); 
      this.createChart(dates, counts);
    });

    this.incidentService.getIncidentsByType().subscribe((data: any[]) => {
      const incidentTypes = data.map(item => item[0]);
      const incidentCounts = data.map(item => item[1]);
      this.createBarChart(incidentTypes, incidentCounts);
    });
  }

  createChart(dates: string[], counts: number[]): void {
    this.chart = new Chart('lineCanvas', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Incidents Per Day',
          data: counts,
          borderColor: 'black', 
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true, 
          lineTension: 0 
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Incidents Per Day',
          fontColor: 'black' 
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM D'
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Number of Incidents'
            },
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }
    });
  }

  createBarChart(types: string[], counts: number[]): void {
    const colors = this.generateDarkColors(types.length); 
    const datasets = [{
      label: 'Number of Incidents',
      data: counts,
      backgroundColor: colors, 
      borderColor: 'black', 
      borderWidth: 1
    }];
    
    this.barChart = new Chart('barCanvas', {
      type: 'horizontalBar', 
      data: {
        labels: types,
        datasets: datasets
      },
      options: {
        title: {
          display: true,
          text: 'Incidents by Type',
          fontColor: 'black' 
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Number of Incidents',
              fontColor: 'black' 
            },
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              fontColor: 'black' 
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Incident Type',
              fontColor: 'black' 
            },
            ticks: {
              fontColor: 'black' 
            }
          }]
        }
      }
    });
  }

  generateDarkColors(numColors: number): string[] {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(this.getRandomDarkColor());
    }
    return colors;
  }

  getRandomDarkColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return this.darkenColor(color);
  }

  darkenColor(color: string): string {
    
    const rgb = parseInt(color.slice(1), 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >>  8) & 0xff;
    let b = (rgb >>  0) & 0xff;

    
    r = Math.round(r * 0.8);
    g = Math.round(g * 0.8);
    b = Math.round(b * 0.8);

    
    return `#${(r << 16 | g << 8 | b).toString(16)}`;
  }
}
