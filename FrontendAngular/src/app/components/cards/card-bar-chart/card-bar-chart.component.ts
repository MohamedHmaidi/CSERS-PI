import { Component, OnInit, AfterViewInit } from "@angular/core";
import Chart from "chart.js";
import { EquipeStatsService } from '../../../../core/service/ReservationService';
import { EquipeStats } from 'src/core/models/EquipeStats';

@Component({
  selector: "app-card-bar-chart",
  templateUrl: "./card-bar-chart.component.html",
})
export class CardBarChartComponent implements OnInit, AfterViewInit {
  selectedYear: number;
  selectedMonth: number;
  years: number[] = [2022, 2023, 2024, 2025, 2026]; 
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; 
  equipeStats: EquipeStats[] = [];

  constructor(private equipeStatsService: EquipeStatsService) {}

  ngOnInit() {
    this.selectedYear = new Date().getFullYear();
    this.selectedMonth = new Date().getMonth() + 1;
  }

  ngAfterViewInit() {
    this.updateChart();
  }

  updateChart() {
    console.log(`Fetching equipe stats for year ${this.selectedYear} and month ${this.selectedMonth}`);
    this.equipeStatsService.getEquipeStats(this.selectedYear, this.selectedMonth).subscribe(
      (data) => {
        this.equipeStats = data;
        console.log('Equipe stats data received:', this.equipeStats);
        this.renderChart();
      },
      (error) => {
        console.error('Error fetching equipe stats:', error);
      }
    );
  }

  renderChart() {
    const labels = this.equipeStats.map(stat => stat[0]); 
    const data = this.equipeStats.map(stat => stat[1]); // Extract reserved quantities
  
    const config = {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Reserved Quantity",
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: data,
            fill: false,
            barThickness: 8,
          }
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Equipe",
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Value",
              },
            },
          ],
        },
      },
    };
  
    let ctx: any = document.getElementById("bar-chart");
    ctx = ctx.getContext("2d");
    new Chart(ctx, config);
  }
}