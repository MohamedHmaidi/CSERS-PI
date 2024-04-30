import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../services/claim.service';
import { Claim } from '../../models/claim.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claims-back',
  templateUrl: './claims-back.component.html',
  styleUrls: ['./claims-back.component.css']
})
export class ClaimsBackComponent implements OnInit {
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  //Pagination attributes
  currentPage = 0;
  pageSize = 5;
  totalClaims = 0;
  totalPages: number;

  //Search
  filteredClaims: Claim[] = []; // Array to hold filtered claims
  allClaims: Claim[] = [];
  searchQuery: string = ''; // Variable to hold the search query


  claims: Claim[] = [];

  constructor(private claimService: ClaimService, private router: Router) { }

  ngOnInit(): void {
    this.getClaims();
  }

  getClaims() {
    this.claimService.getClaims().subscribe((data) => {
      this.totalClaims = data.length;
      this.totalPages = Math.ceil(this.totalClaims / this.pageSize);
      this.filteredClaims = data;
      this.allClaims = data;
      this.filterClaims(); // Apply initial filtering
      this.paginateClaims(); // Paginate the claims
    },
    (error) => {
      console.error('Error fetching claims:', error);
    });
  }

  filterClaims(): void {
    this.filteredClaims = this.allClaims;
    let claimsToFilter = this.searchQuery.trim() === '' ? this.filteredClaims : this.filteredClaims.slice(); // Use full claims list if search query is empty
    this.filteredClaims = claimsToFilter.filter(claim => 
      claim.title.toLowerCase().includes(this.searchQuery.toLowerCase())  // Filter by claim title
    );
    this.totalClaims = this.filteredClaims.length;
    this.totalPages = Math.ceil(this.totalClaims / this.pageSize);
    this.paginateClaims(); // Paginate the claims after filtering
  }

  paginateClaims(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.claims = this.filteredClaims.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginateClaims(); // Paginate the claims when changing page
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.paginateClaims(); // Paginate the claims when changing page
    }
  }

  onSearchQueryChange(): void {
    this.filterClaims(); // Apply filtering when search query changes
  }

   //=== SORTING ===
   sortDirection: 'asc' | 'desc' = 'asc'; // Initial sort direction

   //Sort By Title
 // Function to toggle the sort direction
 onSortByTitle() {
   this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
   this.sortClaims('title');
   this.paginateClaims();
 }
 onSortByDate() {
   this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
   this.sortClaims('date');
   this.paginateClaims();
 }
 onSortByStatus() {
   this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
   this.sortClaims('status');
   this.paginateClaims();
 }
 
 onSortByType() {
   this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
   this.sortClaims('claimType');
   this.paginateClaims();
 }

 // Function to sort claims by title
 sortClaims(property: string) {
   if (property === 'title') {
     console.log('Sorting claims by', property);
     this.filteredClaims.sort((a, b) => {
       if (this.sortDirection === 'asc') {
         return a.title.localeCompare(b.title);
       } else {
         return b.title.localeCompare(a.title);
       }
     });
   } else if (property === 'date') {
     console.log('Sorting claims by', property);
     this.filteredClaims.sort((a, b) => {
       const dateA = new Date(a.date).getTime();
       const dateB = new Date(b.date).getTime();
       if (this.sortDirection === 'asc') {
         return dateA - dateB;
       } else {
         return dateB - dateA;
       }
     });
   } else if (property === 'status') {
     console.log('Sorting claims by', property);
     this.filteredClaims.sort((a, b) => {
       if (this.sortDirection === 'asc') {
         return a.status.localeCompare(b.status);
       } else {
         return b.status.localeCompare(a.status);
       }
     });
   } else if (property === 'claimType') {
     console.log('Sorting claims by', property);
     this.filteredClaims.sort((a, b) => {
       if (this.sortDirection === 'asc') {
         return a.claimType.localeCompare(b.claimType);
       } else {
         return b.claimType.localeCompare(a.claimType);
       }
     });
   }
 }

  navigateToStatistics(): void{
    this.router.navigate(['/admin/claims/claims-stats']);
  }

  navigateToClaimInfo(id: number){
    this.router.navigate(['/admin/claims/claim-info', id]);
  }

  navigateToClaimCreation(): void {
    this.router.navigate(['/admin/claims/claim-create']); 
  }

}
