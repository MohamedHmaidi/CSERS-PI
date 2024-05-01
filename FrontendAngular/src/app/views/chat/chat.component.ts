import { Component } from '@angular/core';
import { DialogflowService } from '../../../core/service/DialogflowService'; 

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userInput: string = '';
  messages: string[] = [];
  constructor(private dialogflowService: DialogflowService) {}

}

