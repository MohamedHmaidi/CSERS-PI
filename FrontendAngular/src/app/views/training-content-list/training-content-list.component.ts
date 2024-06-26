import { Component, OnInit } from '@angular/core';
import { TrainingContentService } from '../../../core/service/training-content.service';
import { TrainingContent } from '../../../core/models/training-content.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-content-list',
  templateUrl: './training-content-list.component.html',
  styleUrls: ['./training-content-list.component.css']
})
export class TrainingContentListComponent implements OnInit {
  trainingContents: TrainingContent[] = []; // To store fetched data

  constructor(private trainingContentService: TrainingContentService, private router: Router) { }

  ngOnInit(): void {
    this.fetchTrainingContents(); // Fetch on component initialization
  }

  fetchTrainingContents() {
    this.trainingContentService.getTrainingContents()
      .subscribe(contents => this.trainingContents = contents);
  }

  viewQuizzes(trainingContentId: number): void {
    this.router.navigate(['/quizzes'], { queryParams: { trainingContentId } });
  }
  
  AddTrainingContent(): void {
    // Navigate to the '/addtrainingcontent' route when the button is clicked
    this.router.navigate(['/addtrainingcontent']);
  }
}
