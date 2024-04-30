import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service'; 
import { Quiz } from '../quiz/quiz.model';
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

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizService.getQuizzes()
        .subscribe(quizzes => this.quizzes = quizzes);
  } 

  getFormattedQuizType(type: string): string {
    // Split the type string by underscores
    const words = type.split('_');

    // Capitalize the first letter of each word and join them with spaces
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  toggleModal(selectedQuiz: Quiz) { 
    this.showModal = !this.showModal;
    this.selectedQuizForModal = selectedQuiz; // Assign the quiz to display
}

viewQuiz(quizId: number) {
  this.router.navigate(['/available-quizzes', quizId]); 
}



}
