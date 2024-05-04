import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../core/service/quiz.service';
import { TrainingContentService } from '../../../core/service/training-content.service';
import { Quiz } from '../../../core/models/quiz.model';
import { TrainingContent } from '../../../core/models/training-content.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-available-quizzes',
  templateUrl: './available-quizzes.component.html',
  styleUrls: ['./available-quizzes.component.css']
})
export class AvailableQuizzesComponent implements OnInit {
  quizzes: Quiz[] = [];
  showModal = false;
  selectedQuizForModal: Quiz | null = null;
  trainingContent: TrainingContent | null = null; // Training content for modal

  constructor(
    private quizService: QuizService,
    private trainingContentService: TrainingContentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getQuizzes().subscribe(
      quizzes => {
        this.quizzes = quizzes;
        // Fetch training content for each quiz
        this.fetchTrainingContentsForQuizzes();
      },
      error => {
        console.error('Error loading quizzes:', error);
      }
    );
  }

  fetchTrainingContentsForQuizzes(): void {
    // Reset training content for each quiz
    this.quizzes.forEach(quiz => {
      this.quizService.getTrainingContentIdByQuizId(quiz.id).subscribe(
        trainingContentId => {
          console.log(`Training content ID for quiz ${quiz.id}:`, trainingContentId);
  
          if (trainingContentId) {
            this.trainingContentService.getTrainingContentById(trainingContentId).subscribe(
              trainingContent => {
                if (trainingContent) {
                  // Set the fetched training content for the corresponding quiz
                  quiz.trainingContent = trainingContent;
                  console.log(`Training content for quiz ${quiz.id}:`, trainingContent);
                }
              },
              error => {
                console.error(`Error fetching training content for quiz ${quiz.id}:`, error);
              }
            );
          }
        },
        error => {
          console.error(`Error fetching training content ID for quiz ${quiz.id}:`, error);
        }
      );
    });
  }
  

  getFormattedQuizType(type: string): string {
    const words = type.split('_');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

toggleModal(selectedQuiz?: Quiz): void {
  this.showModal = !this.showModal;
  this.selectedQuizForModal = selectedQuiz || null;

  // Check if selectedQuizForModal is defined and has trainingContent
  if (this.selectedQuizForModal && this.selectedQuizForModal.trainingContent) {
    this.trainingContent = this.selectedQuizForModal.trainingContent;
  } else {
    this.trainingContent = null; // Reset trainingContent if not available
  }
}

  
  viewQuiz(quizId: number) {
    this.router.navigate(['/available-quizzes', quizId]);
  }

  isYoutubeUrl(url: string): boolean {
    return url.startsWith('https://www.youtube.com/watch?v=');
  }

  extractYoutubeVideoId(url: string): string {
    const videoIdIndex = url.indexOf('v=') + 2;
    const videoId = url.substring(videoIdIndex);
    return videoId;
  }
}
