export interface QuizQuestion {
    id: number;
    text: string;
    explanation: string | null; 
    answerChoiceA: string;
    answerChoiceB: string;
    answerChoiceC: string;
    answerChoiceD: string;
    correctAnswer: string;
    essayAnswerExample: string | null;
  }
  