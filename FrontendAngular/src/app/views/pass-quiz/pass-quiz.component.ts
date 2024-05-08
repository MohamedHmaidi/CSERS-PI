import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizQuestionService } from '../../../core/service/quiz-question.service'; // Import your QuizQuestionService
import { QuizQuestion } from '../../../core/models/quiz-question.model'; // Import your QuizQuestion model
import { Quiz } from '../../../core/models/quiz.model'; // Import your Quiz model
import { QuizService } from '../../../core/service/quiz.service'; // Import your QuizService

@Component({
  selector: 'app-pass-quiz',
  templateUrl: './pass-quiz.component.html',
  styleUrls: ['./pass-quiz.component.css']
})
export class PassQuizComponent implements OnInit {
  quizQuestions: QuizQuestion[] = [];
  currentQuestionIndex = 0;
  currentQuestion: QuizQuestion | null = null;
  selectedAnswer: string | null = null;
  showCorrectAnswerMessage = false;
  currentQuiz: Quiz | null = null;

  totalQuestions: number = 0;
  correctAnswers: number = 0;
  score: number = 0;
  quizComplete: boolean = false;
  resultsDisplayed: boolean = false;
  quizResults: { question: QuizQuestion, selectedAnswer: string | null, correctAnswer: string }[] = [];

  constructor(private route: ActivatedRoute,
              private quizQuestionService: QuizQuestionService,
              private quizService: QuizService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const quizId = Number(params.get('id'));
      this.loadQuiz(quizId);
      this.loadQuizQuestions(quizId);
    });
  }

  loadQuiz(quizId: number): void {
    this.quizService.getQuizById(quizId).subscribe((quiz: Quiz) => {
      this.currentQuiz = quiz;
    });
  }

  loadQuizQuestions(quizId: number): void {
    this.quizQuestionService.getQuestionsByQuizId(quizId).subscribe((questions: QuizQuestion[]) => {
      this.quizQuestions = this.shuffleArray(questions);
      this.totalQuestions = this.quizQuestions.length;
      this.presentQuestion();
    });
  }

  shuffleArray(array: any[]): any[] {
    // Implement array shuffling (e.g., Fisher-Yates algorithm)
    return array;
  }

  presentQuestion(): void {
    if (this.currentQuestionIndex < this.quizQuestions.length) {
      this.currentQuestion = this.quizQuestions[this.currentQuestionIndex];
      this.selectedAnswer = null;
      this.showCorrectAnswerMessage = false;
    } else {
      this.quizComplete = true;
      this.calculateScore();
    }
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  onNextQuestion(): void {
    if (this.currentQuestion && this.selectedAnswer !== null) {
      switch (this.currentQuiz?.type) {
        case 'ESSAY':
          this.correctAnswers++;
          break;
        case 'TRUE_FALSE':
          if (this.selectedAnswer === this.currentQuestion.correctAnswer) {
            this.correctAnswers++;
          }
          break;
        case 'FILL_IN_THE_BLANK':
          if (this.selectedAnswer.toLowerCase() === this.currentQuestion.correctAnswer.toLowerCase()) {
            this.correctAnswers++;
          }
          break;
        case 'MATCHING':
          if (this.selectedAnswer === this.currentQuestion.correctAnswer) {
            this.correctAnswers++;
          }
          break;
        default:
          let selectedLetter: string | null = null;
          switch (this.selectedAnswer) {
            case this.currentQuestion.answerChoiceA:
              selectedLetter = 'A';
              break;
            case this.currentQuestion.answerChoiceB:
              selectedLetter = 'B';
              break;
            case this.currentQuestion.answerChoiceC:
              selectedLetter = 'C';
              break;
            case this.currentQuestion.answerChoiceD:
              selectedLetter = 'D';
              break;
          }
          if (selectedLetter === this.currentQuestion.correctAnswer) {
            this.correctAnswers++;
          }
          break;
      }

      this.recordAnswer(); // Record the answer details
      this.currentQuestionIndex++;
      this.presentQuestion();
    }
  }

  recordAnswer(): void {
    const correctAnswer = this.currentQuestion!.correctAnswer;
    this.quizResults.push({
      question: this.currentQuestion!,
      selectedAnswer: this.selectedAnswer,
      correctAnswer: correctAnswer
    });
  }

  calculateScore(): void {
    this.score = (this.correctAnswers / this.totalQuestions) * 100;
  }

  displayResults(): void {
    this.resultsDisplayed = true;
  }
}

