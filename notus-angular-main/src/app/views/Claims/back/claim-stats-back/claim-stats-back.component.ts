import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../services/claim.service';
import { Router } from '@angular/router';
import Chart from "chart.js";

@Component({
  selector: 'app-claim-stats-back',
  templateUrl: './claim-stats-back.component.html',
  styleUrls: ['./claim-stats-back.component.css']
})
export class ClaimStatsBackComponent implements OnInit {
  claimTypeStatistics = {};
  claimClassStatistics = {};

  constructor(private claimService: ClaimService, private router: Router) { }

  ngOnInit(): void {
    this.getClaimTypeStatistics();
    this.getClaimClassStatistics();
  }

  getClaimTypeStatistics() {
    this.claimService.getClaimTypeStatistics().subscribe(data => {
      const claimStats = {};
      for (const [key, value] of Object.entries(data)) {
        claimStats[key.toString()] = value;
      }
      this.claimTypeStatistics = claimStats;
      this.renderTypeChart();
    });
  }

  getClaimClassStatistics() {
    this.claimService.getClaimClassStatistics().subscribe(data => {
      const claimStats = {};
      for (const [key, value] of Object.entries(data)) {
        claimStats[key.toString()] = value;
      }
      this.claimClassStatistics = claimStats;
      this.renderClassChart();
    });
  }
  

  renderTypeChart() {
    let config = {
      type: "bar",
      data: {
        labels: Object.keys(this.claimTypeStatistics), // Use the classification types as labels
        datasets: [
          {
            label: "Total Claims",
            backgroundColor: "#e53e3e",
            borderColor: "#e53e3e",
            data: Object.values(this.claimTypeStatistics), // Use the counts as data
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
          text: "Claims Chart",
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
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Type",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Number of Claims",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };

    let ctx: any = document.getElementById("claim-type-chart");
    ctx = ctx.getContext("2d");
    new Chart(ctx, config);
  }

  renderClassChart() {
    let config = {
      type: "pie", // Change chart type to pie
      data: {
        labels: Object.keys(this.claimClassStatistics), // Use the classification types as labels
        datasets: [
          {
            label: "Total Claims",
            backgroundColor: ["#e53e3e", "#dd6b20", "#d69e2e", "#98D9F5"], // Set background colors for each section of the pie
            borderColor: "#fff",
            data: Object.values(this.claimClassStatistics), // Use the counts as data
          }
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Claims Classification Chart", // Add a title for the chart
        },
        legend: {
          position: "bottom",
        },
      },
    };
  
    let ctx: any = document.getElementById("claim-class-chart");
    ctx = ctx.getContext("2d");
    new Chart(ctx, config);
  }

  navigateToClaimList(): void {
    this.router.navigate(['admin/claims/claims-back']); // Navigate to claim creation page
  }
}
