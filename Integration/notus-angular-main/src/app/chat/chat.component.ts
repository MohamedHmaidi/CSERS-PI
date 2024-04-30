import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.3s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ChatComponent implements OnInit {
  message: string;
  usernameInput: string = '';

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.initializeWebSocketConnection(() => {
      this.fetchChatMessages(); // Fetch chat messages after establishing WebSocket connection
    });
  }

  sendMessage() {
    if (this.message && this.message.trim() !== '') {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  setUsername() {
    if (this.usernameInput.trim() !== '') {
      this.chatService.setUsername(this.usernameInput);
      this.usernameInput = '';
    }
  }

  fetchChatMessages() {
    this.chatService.getAllMessages().subscribe(
      (messages: any[]) => {
        this.chatService.messages = messages;
      },
      (error) => {
        console.log('Error fetching chat messages:', error);
      }
    );
  }
}