import { Component, OnInit } from '@angular/core';
import { RessourceService } from './ressource.service';
import { Router } from '@angular/router';
import { Ressource } from 'src/app/models/Ressource';
import { HttpErrorResponse } from '@angular/common/http';
import {  ApexChart, ApexNonAxisChartSeries } from 'chart.js';



// export type ChartOptions = {
//   series: ApexNonAxisChartSeries;
//   chart: ApexChart;
//   responsive: any[];
//   labels: any;
  
// };


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
 // @ViewChild("chartUsedTypeRessource") chart: ChartComponent;
 // public chartOptions: Partial<ChartOptions>;

 constructor(private ressourceService: RessourceService, private router: Router) { 

 }
//  constructor() { }

  ngOnInit(): void {
    this.filteredRessources = this.ressources;
    this.ressourcesbackup=this.ressources;
    

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
        alert("wlh tbadlet :)")
           },
      
    );
  }


  redirectToAddRessource() {
    this.router.navigate(['/add-ressource']); 
  }

  //applyFilters() {
    //console.log("Applying filters...");

    //this.filteredRessources = this.ressources.filter(ressource =>
      //ressource.nomRessource.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
      //ressource.localisation.toLowerCase().includes(this.locationFilter.toLowerCase()) &&
      //ressource.totalQuantite.toString().includes(this.quantityFilter.toLowerCase()) &&
      //ressource.typeRessource.toString().includes(this.typeFilter.toLowerCase()) &&
      //ressource.etatRessource.toString().includes(this.etatFilter.toLowerCase()) 


    //);
    //console.log("Filtered resources:", this.filteredRessources);

  //}
  applyFilters() {
    console.log("Applying filters...");
  
    this.ressources=this.ressourcesbackup;
    this.filteredRessources = this.ressources.filter(ressource =>
      ressource.nomRessource.toLowerCase().includes(this.nameFilter.toLowerCase()) 
       //&& ressource.localisation.toLowerCase().includes(this.locationFilter.toLowerCase()) 
       //&&
      // ressource.totalQuantite.toString().includes(this.quantityFilter.toString().toLowerCase()) &&
      // ressource.typeRessource.toString().includes(this.typeFilter.toString().toLowerCase()) &&
      // ressource.etatRessource.toString().includes(this.etatFilter.toString().toLowerCase())
    );
  
    this.ressourcesbackup=this.ressources;
    this.ressources=this.filteredRessources;
    console.log("Filtered resources:", this.filteredRessources);
  }



   // (response: Ressource) => {
      //   if (ressource.archive) {
      //     console.log(response);
      //     this.toast.success({ detail: 'Success', summary: 'Ressource est archivée !', position: 'topRight', duration: 1000 })
      //   }
      //   else {
      //     console.log(response);
      //     this.toast.error({ detail: 'Error', summary: 'Ressource est disarchivée !', position: 'topRight', duration: 1000 })
      //   }
      //   this.getRessourcesBack();
      // },
      // (error: HttpErrorResponse) => {
      //   //alert(error.message);
      //   this.toast.error({ detail: 'Error', summary: 'Something wrong !', position: 'topRight', duration: 1000 })
      // }

  


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
