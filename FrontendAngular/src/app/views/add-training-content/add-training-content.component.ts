import { Component, OnInit } from '@angular/core';
import { TrainingContent } from '../../../core/models/training-content.model';
import { TrainingContentService } from '../../../core/service/training-content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-training-content',
  templateUrl: './add-training-content.component.html',
  styleUrls: ['./add-training-content.component.css']
})
export class AddTrainingContentComponent implements OnInit {

  newTrainingContent: TrainingContent = {
    id: 0,
    title: '',
    description: '',
    quizzes: [],
    type: 'VIDEO',
    createdDate: new Date(),
    completed: false,
    estimatedTime: 0,
    contentUrl: '',
    videoDuration: 0
  };

  constructor(private trainingContentService: TrainingContentService, private router: Router) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.trainingContentService.createTrainingContent(this.newTrainingContent).subscribe(
      (response) => {
        console.log('Training content added successfully:', response);
        this.router.navigate(['/training-content']); // Redirect to training content list page after successful creation
      },
      (error) => {
        console.error('Error adding training content:', error);
        // Handle error as needed
      }
    );
  }

}
