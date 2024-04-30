import { QuizQuestion } from "./quiz-question.model";

export interface Quiz {
    id: number;
    title: string;
    description: string;
    passingScore: number; 
    type: string; 
    createdDate: string;
    questions: QuizQuestion[]; 
  }
  