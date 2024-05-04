import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { Equipe } from "../../../../core/models/Equipe";
import { EquipeService } from "../../../../core/service/EquipeService";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Membre } from "../../../../core/models/Membre";
import { MembreService } from "../../../../core/service/MembreService";
import { Router } from '@angular/router';
import { MessagingService } from '../../../../core/service/messaging.service';
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-equipegetall',
  templateUrl: './getallequipe.component.html',
  styleUrls: ['./getallequipe.component.css'],
  animations: [
    trigger('flash', [
      state('visible', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      transition('visible <=> hidden', [
        animate('0.5s ease-in-out'),
      ]),
    ]),
  ],
})
export class EquipegetallComponent implements OnInit {
  equipes: Equipe[] = [];
  color: string = "light";
  message: { title: string, body: string }; 
  showAlert= false;

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 2;


  @ViewChild('membreImages', { static: false }) membreImages: ElementRef;

  constructor(private equipeService: EquipeService, private membreService: MembreService , 
    private router: Router ,private sanitizer: DomSanitizer, 
    private messagingService: MessagingService,  private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
      this.subscribeToMessages(); 
      this.loadEquipes();
    }

    private subscribeToMessages() {
      this.messagingService.receiveMessage(); // Start receiving messages
      this.messagingService.currentMessage.subscribe(message => {
        this.message = message; // Update the message variable
        this.showAlert = true; // Show the alert when a new message is received
        // Close the alert after 5 seconds
        setTimeout(() => {
          this.showAlert = false; // Hide the alert
          this.cdr.detectChanges(); // Manually trigger change detection
        }, 5000);
      });
    }

    loadEquipes() {
      this.equipeService.getAllEquipes().subscribe((equipes) => {
        this.equipes = equipes;
        console.log('Total Equipes:', this.equipes.length);
        console.log('Current Page:', this.currentPage);
        console.log('Total Pages:', this.totalPages());
        // Fetch member images for each equipe
    this.fetchMembersForEquipes();
      });
    }
  
    paginate() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.equipes.length);
      return this.equipes.slice(startIndex, endIndex);
    }
    
    openUpdatePage(equipeId: number) {
      this.router.navigate(['/admin/updateequipe', equipeId]);
    }
  
  fetchMembersForEquipes() {
    this.equipes.forEach(equipe => {
      this.equipeService.getMemberImagesByEquipeId(equipe.idEquipe).subscribe(images => {
        equipe.membres = images.map(image => this.convertBase64ToImageUrl(image));
      });
    });
  }

  convertBase64ToImageUrl(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  fetchMembers() {
    this.equipes.forEach(equipe => {
      this.membreService.getMembersByEquipeId(equipe.idEquipe).subscribe(membres => {
        equipe.membres = membres;
      });
    });
  }
  
  deleteEquipe(id: number) {
    this.equipeService.deleteEquipe(id).subscribe(() => {
      // Remove the deleted equipe from the list
      this.equipes = this.equipes.filter(equipe => equipe.idEquipe !== id);
      this.loadEquipes();
    }, error => {
      console.error('Error deleting equipe:', error);
      this.loadEquipes();
    });
  }

  toggleTooltip(index: number) {
    if (!this.membreImages) return; 
    
    const images = this.membreImages.nativeElement.querySelectorAll('.membre-image');
    images.forEach((image, i) => {
      if (i === index) {
        image.classList.add('show-tooltip');
      } else {
        image.classList.remove('show-tooltip');
      }
    });
  }

  closeAlert(): void {
    this.showAlert = false; 
  }

  totalPages(): number[] {
    const total = Math.ceil(this.equipes.length / this.itemsPerPage);
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  
  onPageChange(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages().length) {
      this.currentPage = pageNumber;
      console.log('Current Page:', this.currentPage);
    }
  }
  

}
