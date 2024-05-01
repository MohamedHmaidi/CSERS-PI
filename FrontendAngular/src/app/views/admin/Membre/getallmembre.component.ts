import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Membre } from "../../../../core/models/Membre";
import { MembreService } from "../../../../core/service/MembreService";
import { Router } from '@angular/router';
import { MessagingService } from '../../../../core/service/messaging.service';
import { NotificationService } from '../../../../core/service/NotificationService';
import { EquipeService } from "src/core/service/EquipeService";
import { SearchService } from "src/core/service/SearchService";
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-membregetall',
  templateUrl: './getallmembre.component.html'
})
export class MembregetallComponent implements OnInit {
  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef',{ static: false }) btnDropdownRef: ElementRef;
  @ViewChild('popoverDropdownRef',{ static: false }) popoverDropdownRef: ElementRef;
  membres: Membre[] = [];
  color: string = "light";
  //message;
  recommendedTeams: string[] = []; 
  selectedMemberId: number | null = null;
  poste: string = '';
  competencesTechniques: string = '';
  certifications: string = '';


  constructor(private membreService: MembreService, 
              private router: Router,
              private messagingService: MessagingService,
              private notificationService: NotificationService,
              private equipeService: EquipeService,
              private searchService: SearchService) {}

  ngOnInit(): void {
    this.getAllMembres();
    this.enableNotifications(); 
    //this.messagingService.receiveMessage();
    //this.message = this.messagingService.currentMessage;
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  openUpdatePage(id: number) {
    this.router.navigate(['/admin/updatemembre', id]);
  }

  getAllMembres(): void {
    this.membreService.getAllMembres().subscribe(
      (membres: Membre[]) => {
        this.membres = membres;
        console.log("Membres fetched successfully:", this.membres);
      },
      (error: any) => {
        console.error('Error fetching membres:', error);

      }
    );
  }

  goToProfile(id: number) {
    this.membreService.getMembreById(id).subscribe(
      (membre) => {
        this.router.navigate(['/profile', membre.idMembre]);
      },
      (error) => {
        console.error('Error retrieving member profile:', error);

      }
    );
  }

  searchMembres(): void {
    console.log('Search query:', {
      poste: this.poste,
      competencesTechniques: this.competencesTechniques,
      certifications: this.certifications
    });
  
    const query = {
      poste: this.poste,
      competencesTechniques: this.competencesTechniques,
      certifications: this.certifications
    };
  
    this.searchService.search(query).subscribe(
      (membres: Membre[]) => {
        this.membres = membres;
        console.log("Membres fetched successfully:", this.membres);
      },
      (error: any) => {
        console.error('Error fetching membres:', error);

      }
    );
  }
  
  onPosteChange(value: string) {
    this.poste = value;
  }

  onCompetencesTechniquesChange(value: string) {
    this.competencesTechniques = value;
  }

  onCertificationsChange(value: string) {
    this.certifications = value;
  }

  deleteMembre(id: number): void {
    this.membreService.deleteMembre(id).subscribe(
      (response: any) => {
        if (response && response.message === 'success') {
          console.log('Member deleted successfully');
          this.getAllMembres();
        } else {
          console.error('Error deleting member:', response);
          this.getAllMembres();
        }
      },
      (error: any) => {
        console.error('Error deleting member:', error);
        this.getAllMembres();
      }
    );
  }

  enableNotifications() {
    this.messagingService.requestPermission();
  }

  sendTestNotification() {
    const deviceToken = 'YOUR_DEVICE_TOKEN'; 
    const title = 'Incident';
    const body = 'This is a test notification ';

    console.log('Sending test notification...');
  this.notificationService.sendNotification(deviceToken, title, body)
    .subscribe(response => {
      console.log('Notification sent successfully:', response);
      console.log('Displaying desktop notification...');
      this.notificationService.displayNotification('Incident', 'This is a test notification', 'assets/img/1022323.png', '/admin/listequipe');
    }, error => {
      console.error('Error sending notification:', error);
    });
}

  fetchRecommendedTeams(poste: string): void {
    this.membreService.getRecommendedTeamsByPoste(poste).subscribe(
      (teams: string[]) => {
        this.recommendedTeams = teams;
        this.createPopper();
      },
      (error: any) => {
        console.error('Error fetching recommended teams:', error);
      }
    );
  }

  onAffecterClick(memberId: number): void {
    const selectedMember = this.membres.find(m => m.idMembre === memberId);
    if (selectedMember) {
      this.selectedMemberId = memberId;
      this.fetchRecommendedTeams(selectedMember.poste);
    }
  }

  createPopper(): void {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }

  onTeamSelected(team: string): void {
    if (this.selectedMemberId) {
      this.membreService.updateMembreEquipe(this.selectedMemberId, team).subscribe(
        () => {
          console.log(`Member's equipe updated to ${team}`);
          this.router.navigate(['/admin/listequipe']);
        },
        (error) => {
          console.error('Error updating member equipe:', error);
        }
      );
    } 
  }
}
