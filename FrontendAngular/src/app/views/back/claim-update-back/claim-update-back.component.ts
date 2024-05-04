import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Claim, ClaimType } from '../../../../core/models/claim.model';
import { ClaimService } from '../../../../core/service/claim.service';

@Component({
  selector: 'app-claim-update-back',
  templateUrl: './claim-update-back.component.html',
  styleUrls: ['./claim-update-back.component.css']
})
export class ClaimUpdateBackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private claimService: ClaimService) { }

  claimId: number;
  claim: Claim;
  claimTypes = ClaimType;
  formSubmitted = false;

  ngOnInit(): void {
    this.claimId = this.route.snapshot.params['id'];

    this.claim = new Claim();
    this.claimService.getClaimById(this.claimId).subscribe( data => {
      this.claim = data;
    });
  }

  navigateBackToClaim(): void {
    this.router.navigate(['admin/claims/claim-info', this.claimId]);
  }

  updateClaim(){
    this.claimService.updateClaim(this.claim).subscribe(data =>{
      console.log(data);
      this.navigateBackToClaim();
    },
    error => console.log(error));
  }

  onSubmit(){
    // Mark the form as submitted
    this.formSubmitted = true;

    // Check if the form is valid
    if (this.isFormValid()) {
      console.log(this.claim);
      this.updateClaim();
    } else {
      window.alert("Form is invalid. Please fill in all fields.");
    }
  }

  // Function to check if the form is valid
  isFormValid(): boolean {
    // Check if any required fields are empty
    return !!this.claim.title && !!this.claim.description && !!this.claim.claimType;
  }

}
