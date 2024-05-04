import { QuizQuestion } from "./quiz-question.model";
import { TrainingContent } from "./training-content.model"; // Import TrainingContent model


export interface Quiz {
    id: number;
    title: string;
    description: string;
    passingScore: number; 
    type: string; 
    createdDate: string;
    questions: QuizQuestion[];
    trainingContent?: TrainingContent; // Optional TrainingContent property

  }
  