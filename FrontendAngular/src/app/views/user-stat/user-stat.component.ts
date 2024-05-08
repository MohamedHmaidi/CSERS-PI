import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/AuthenticationService';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboardd',
  templateUrl: './user-stat.component.html',
  styleUrls: ['./user-stat.component.css']
})
export class UserStatComponent implements OnInit {

  histogramChart: Chart;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserStatistics().subscribe(
      (data: any) => {
        const labels: string[] = Object.keys(data);
        const dataValues: number[] = Object.values(data);
  
        const dataset = [{
          label: 'Incident Count',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: dataValues
        }];
  
        this.createHistogram(labels, dataset);
      },
      (error) => {
        console.error('Error fetching user statistics:', error);
      }
    );
  }
  
  createHistogram(labels: string[], dataset: any[]): void {
    const canvas = document.getElementById('histogramCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    this.histogramChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dataset
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
