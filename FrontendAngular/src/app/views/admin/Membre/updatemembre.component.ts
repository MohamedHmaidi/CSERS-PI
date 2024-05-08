import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Membre } from '../../../../core/models/Membre';
import { MembreService } from "../../../../core/service/MembreService";

@Component({
  selector: 'app-updatemembre',
  templateUrl: './updatemembre.component.html'
})
export class UpdateMembreComponent implements OnInit {
  membre: Membre = {} as Membre;
  memberId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private membreService: MembreService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.memberId = params['id'];
      this.getMembreById(this.memberId);
    });
  }

  getMembreById(id: number): void {
    this.membreService.getMembreById(id).subscribe(
      (membre) => {
        this.membre = membre;
      },
      (error) => {
        console.error('Error retrieving member:', error);
      }
    );
  }

  updateMembre(): void {
    this.membreService.updateMembre(this.memberId, this.membre).subscribe(
      () => {
        console.log('Member updated successfully');
        // Redirect to the list of members
        this.router.navigate(['/admin/listemembre']);
      },
      (error) => {
        console.error('Error updating member:', error);
      }
    );
  }
}
