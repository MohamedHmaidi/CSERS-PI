import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../services/quiz.service'; 
import { QuizQuestionService } from '../services/quiz-question.service'; 
import { Quiz } from '../quiz/quiz.model'; 
import { QuizQuestion } from '../quiz/quiz-question.model'; 

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  quiz: Quiz | null = null; 
  showQuestionForm = false; 
  newQuestion: QuizQuestion = {
    text: '',
    answerChoiceA: '',
    answerChoiceB: '',
    answerChoiceC: '',
    answerChoiceD: '',
    correctAnswer: '', // Assuming answers are single characters (A, B, C, D)
    explanation: '' ,
    id: 0,
    essayAnswerExample: ''
  };

  editingQuestionIndices: number[] = [];
  editingAnswerChoices = false;
  editingCorrectAnswer = false;
  editingExplanation = false;

  constructor(
    private route: ActivatedRoute, 
    private quizService: QuizService,
    private questionService: QuizQuestionService 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      const quizId = Number(params.get('id')); 
      this.fetchQuiz(quizId);
    });
  }

  editQuestion(index: number) {
    const indexOfQuestion = this.editingQuestionIndices.indexOf(index);
    if (indexOfQuestion === -1) {
      // Question is not being edited, add it to the array
      this.editingQuestionIndices.push(index);
    } else {
      // Question is being edited, remove it from the array
      this.editingQuestionIndices.splice(indexOfQuestion, 1);
    }
  }

  isEditingQuestion(index: number): boolean {
    // Check if the question is being edited
    return this.editingQuestionIndices.includes(index);
  }

  fetchQuiz(quizId: number) {
    this.quizService.getQuizById(quizId)
      .subscribe({
        next: (quiz) => {
          this.quiz = quiz; 
        }, 
        error: (err) => {
          console.error('Error fetching quiz:', err);
        }
      });
  }

  addQuestion() {
    this.showQuestionForm = true;
  }

  deleteQuestion(index: number) {
    if (confirm("Are you sure you want to delete this question?")) {
      const questionId = this.quiz.questions[index].id;
      const deletedQuestion = this.quiz.questions.splice(index, 1)[0]; // Store deleted question
  
      this.questionService.deleteQuestion(this.quiz.id, questionId)
        .subscribe({
          next: () => {
            console.log('Question deleted successfully'); 
          }, 
          error: (error) => {
            console.error("Error deleting question:", error);
            this.quiz.questions.splice(index, 0, deletedQuestion); // Re-insert if the delete failed
            // Display a user-friendly error message
          }
        }); 
    } 
  }
  

  saveQuestion() {
    const quizId = this.quiz.id; 
    this.questionService.createQuestion(quizId, this.newQuestion)
      .subscribe({
        next: (newQuestion) => {
          this.quiz.questions.push(newQuestion); 
          this.newQuestion = { 
            text: '', 
            answerChoiceA: '',
            answerChoiceB: '',
            answerChoiceC: '',
            answerChoiceD: '', 
            correctAnswer: '',
            explanation: '',
            id: 0,
            essayAnswerExample: ''
         }; // Reset form
          this.showQuestionForm = false; 
        }, 
        error: (err) => {
          console.error('Error creating question:', err);
        }
      });
  }

  updateQuestion(question: QuizQuestion) { // Renamed the method
    console.log("Incoming question data:", question);
    this.questionService.updateQuestion(this.quiz.id, question.id, question)
      .subscribe({
        next: () => {
          console.log('Question updated successfully');
        },
        error: (error) => {
          console.error('Error updating question:', error);
          // Handle error (display feedback)
        }
      });

    // Reset editing state
    this.editingQuestionIndices = []; 
    this.editingAnswerChoices = false;
    this.editingCorrectAnswer = false;
    this.editingExplanation = false;
  }
  





}
