import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Claim, ClaimType } from '../../../../core/models/claim.model';
import { ClaimService } from '../../../../core/service/claim.service';

@Component({
  selector: 'app-claim-info',
  templateUrl: './claim-info.component.html',
  styleUrls: ['./claim-info.component.css']
})
export class ClaimInfoComponent implements OnInit {
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  claimId: number;
  claim: Claim;

  constructor(private route: ActivatedRoute, private claimService: ClaimService, private router: Router) { }

  ngOnInit(): void {
    this.claimId = this.route.snapshot.params['id'];

    this.claim = new Claim();
    this.claimService.getClaimById(this.claimId).subscribe( data => {
      this.claim = data;
    });
  }

  navigateToClaimList(): void {
    this.router.navigate(['/claims/claims-front']);
  }

  updateClaim(){
    this.router.navigate(['/claims/claim-update', this.claimId]);
  }

  removeClaim(){
    this.claimService.deleteClaim(this.claimId).subscribe(data =>{
      console.log(data);
      this.navigateToClaimList();
    },
    error => console.log(error));
  }

  checkSpelling(){
    this.claimService.correctClaim(this.claimId).subscribe((correctedText: string) => {
      if (correctedText != ""){
        this.claim.description = correctedText;
      } 
    });
    this.claimService.updateClaim(this.claim).subscribe(data =>{
      console.log(this.claim.description);
    },
    error => console.log(error));
  }

  closeClaim(){
    this.claim.status = "CLOSED";
    this.claimService.updateClaim(this.claim).subscribe(data =>{
      console.log(data);
    },
    error => console.log(error));
  }

  openClaim(){
    this.claim.status = "PENDING";
    this.claimService.updateClaim(this.claim).subscribe(data =>{
      console.log(data);
    },
    error => console.log(error));
  }

}
