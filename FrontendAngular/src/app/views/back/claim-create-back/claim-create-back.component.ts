import { Component, OnInit } from '@angular/core';
import { Claim, ClaimType } from '../../../../core/models/claim.model';
import { ClaimService } from '../../../../core/service/claim.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-create-back',
  templateUrl: './claim-create-back.component.html',
  styleUrls: ['./claim-create-back.component.css']
})
export class ClaimCreateBackComponent implements OnInit {
  claim: Claim = new Claim();
  claimTypes = ClaimType;
  formSubmitted = false;

  constructor(private claimService: ClaimService, private router: Router) { }

  ngOnInit(): void {
    this.claim.claimType = ClaimType.FEEDBACK;
  }

  saveClaim(){
    this.claimService.addClaim(this.claim).subscribe(data =>{
      console.log(data);
      this.navigateToClaimList();
    },
    error => console.log(error));
  }

  navigateToClaimList(): void {
    this.router.navigate(['admin/claims/claims-back']); // Navigate to claim creation page
  }

  onSubmit(){
    // Mark the form as submitted
    this.formSubmitted = true;

    // Check if the form is valid
    if (this.isFormValid()) {
      console.log(this.claim);
      this.saveClaim();
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
