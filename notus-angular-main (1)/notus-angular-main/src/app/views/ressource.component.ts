import { Component, OnInit } from '@angular/core';
import { RessourceService } from './ressource.service';
import { Router } from '@angular/router';
import { Ressource } from 'src/app/models/Ressource';
import { HttpErrorResponse } from '@angular/common/http';
import {  ApexChart, ApexNonAxisChartSeries } from 'chart.js';
import { Chart } from 'chart.js';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: any[];
  labels: any;
  
};


@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {


  ressources:Ressource[];
  filteredRessources: Ressource[];
  ressourcesbackup: Ressource[];
  

  currentPage: number = 1;
  pageSize: number = 5; 
  typeRessources: string[] = []; 
  etatRessources: string[] = [];



  //for chart
  [x: string]: any;

  hashMapUsedTypeRessource: Map<String, number> = new Map<string, number>();
  public chartOptions: Partial<ChartOptions>;

 constructor(private ressourceService: RessourceService, private router: Router) { 

 }
//  constructor() { }

  ngOnInit(): void {
    this.filteredRessources = this.ressources;
    this.ressourcesbackup=this.ressources;
    this.getStatistics();
    

   this.getRessourcesBack();
   this.statisticsUsedTypeRessource();
   this.typeRessources = ['DISPOSITIFS','POMMADES','SIROP','PENSEMENTS','DESINFECTANT','VITAMINES','MEDICAMENTS'];
    this.etatRessources = ['DISPONIBLE','HORS_SERVICE','NON_DISPONIBLE'];
  }
  private statisticsUsedTypeRessource() {
    this.ressourceService.statisticsUsedTypeRessource().subscribe(data => {
      console.log(data);

      this.keys = Object.keys(data);
      this.values = Object.values(data);
      console.log(this.keys);
      console.log(this.values[0]);
      this.chartOptions = {
        series: this.values,
        chart: {
          type: "donut"
        },
        labels: this.keys,
        responsive: [
          {
            breakpoint: 400,
            options: {
              chart: {
                width: 50
              },
              legend: {
                position: "left"
              }
            }
          }
        ]
      };

      console.log(this.hashMapUsedTypeRessource);
    })
  }

  ressourcesStatistics = {};

  getStatistics() {
    this.ressourceService.statisticsUsedTypeRessource().subscribe(data => {
      const ressStats = {};
      for (const [key, value] of Object.entries(data)) {
        ressStats[key.toString()] = value;
      }
      this.ressourcesStatistics = ressStats;
      this.renderTypeChart();
    });
  }

  
  renderTypeChart() {
    let config = {
      type: "bar",
      data: {
        labels: Object.keys(this.ressourcesStatistics), // Use the classification types as labels
        datasets: [
          {
            label: "Percentage of used resource",
            backgroundColor: "#e53e3e",
            borderColor: "#e53e3e",
            data: Object.values(this.ressourcesStatistics), // Use the counts as data
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
          text: "Ressources Chart",
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
                labelString: "Type of resource",
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
                labelString: "Percentage of used resource",
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

    let ctx: any = document.getElementById("ressources-chart");
    ctx = ctx.getContext("2d");
    new Chart(ctx, config);
  }

  private getRessourcesBack() {
    this.ressourceService.getRessourcesBack().subscribe(data => {
      this.ressources = data;
      this.ressourcesbackup= data;
    });
  }

  public getOneRessource(idRessource: number) {
    this.ressourceService.retrieveRessource(idRessource).subscribe(
      (response: Ressource) => {
        console.log(response);
      });
  }
  public archiveRessource(ressource: Ressource) {
   this.ressourceService.archiveRessource(ressource).subscribe(
   
     (response: Ressource) => {
       console.log(response);
      });
     
      this.ngOnInit()
     
  }
  public modifyRessource(r: Ressource) {
    this.ressourceService.modifyRessource(r).subscribe(
      (response: Ressource) => {
        console.log(response);
        this.getRessourcesBack();
        this.ngOnInit() 
        alert("Ressource modified successfully")
           },
      
    );
  }


  redirectToAddRessource() {
    this.router.navigate(['/add-ressource']); 
  }
  applyFilters() {
    console.log("Applying filters...");
  
    this.ressources=this.ressourcesbackup;
    this.filteredRessources = this.ressources.filter(ressource =>
      ressource.nomRessource.toLowerCase().includes(this.nameFilter.toLowerCase()) 
    );
  
    this.ressourcesbackup=this.ressources;
    this.ressources=this.filteredRessources;
    console.log("Filtered resources:", this.filteredRessources);
  }

  //pagination
  
 
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }


  get paginationStart(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get paginationEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.ressources.length);
  }
  get totalPages(): number {
    return Math.ceil(this.ressources.length / this.pageSize);
  }
  
  

}
