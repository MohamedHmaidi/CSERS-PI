import { Component, Input, OnInit } from '@angular/core';
import { Claim, ClaimType } from '../../../../core/models/claim.model';
import { ClaimResponse } from '../../../../core/models/response.model';
import { ResponseService } from '../../../../core/service/response.service';

@Component({
  selector: 'app-response-per-claim',
  templateUrl: './response-per-claim.component.html',
  styleUrls: ['./response-per-claim.component.css']
})
export class ResponsePerClaimComponent implements OnInit {
  @Input() claim: Claim;
  claimResponses: ClaimResponse[] = [];
  
  constructor(private responseService: ResponseService) { }

  ngOnInit(): void {
    this.responseService.getResponses().subscribe((data) => {
      this.claimResponses = data.filter(response => response.claim.idClaim === this.claim.idClaim);
    },
    (error) => {
      console.error('Error fetching responses:', error);
    });
  }

}
