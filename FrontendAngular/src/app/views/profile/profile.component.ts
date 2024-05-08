import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Membre } from '../../../core/models/Membre';
import { MembreService } from '../../../core/service/MembreService';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  membre: Membre;
  profileImageUrl: SafeUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private membreService: MembreService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['idMembre']; // Convert the id to a number
      console.log('ID from route params:', id);
      this.getMembreById(id);
    });
  }
  goToUpdateMembre(id: number): void {
    this.router.navigate(['/admin/updatemembre', id]);
  }

  getMembreById(id: number): void {
    console.log('Fetching member profile with ID:', id);
    this.membreService.getMembreById(id).subscribe(
      (membre) => {
        console.log('Retrieved member:', membre);
        this.membre = membre;
        // Convert base64 image to SafeUrl
        if (membre.imageFile) {
          this.profileImageUrl = this.convertBase64ToImageUrl(membre.imageFile);
        }
      },
      (error) => {
        console.error('Error retrieving member profile:', error);
        // Handle error
      }
    );
  }

  convertBase64ToImageUrl(base64String: File): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
