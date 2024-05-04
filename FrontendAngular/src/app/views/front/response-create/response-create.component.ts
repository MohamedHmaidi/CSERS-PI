import { Component, Input, OnInit } from '@angular/core';
import { Claim, ClaimType } from '../../../../core/models/claim.model';
import { ClaimResponse } from '../../../../core/models/response.model';
import { ResponseService } from '../../../../core/service/response.service';

@Component({
  selector: 'app-response-create',
  templateUrl: './response-create.component.html',
  styleUrls: ['./response-create.component.css']
})
export class ResponseCreateComponent implements OnInit {
  @Input() claim: Claim;
  claimResponse: ClaimResponse = new ClaimResponse();

  constructor(private responseService: ResponseService) { }

  ngOnInit(): void {
  }

  saveResponse(){
    this.responseService.addResponse(this.claimResponse, this.claim).subscribe(data =>{
      console.log(data);
    },
    error => console.log(error));
  }

  onSubmit(){
    console.log(this.claimResponse);
    this.saveResponse();
    window.location.reload();
  }

}
