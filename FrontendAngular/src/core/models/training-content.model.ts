import { Quiz } from "./quiz.model";

export interface TrainingContent {
    id: number; 
    title: string;
    description: string;
    quizzes: Quiz[]; 
    type: string;
    createdDate: Date; 
    completed: boolean;  
    estimatedTime: number; 
    contentUrl: string; 
    videoDuration: number; 
}
