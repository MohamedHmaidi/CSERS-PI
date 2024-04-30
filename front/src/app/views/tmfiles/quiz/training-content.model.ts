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
    content: any;
    contentUrl: string; 
    videoDuration: number; 
}
