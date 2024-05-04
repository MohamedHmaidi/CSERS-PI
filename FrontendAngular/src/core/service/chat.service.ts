import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AuthService } from '../service/AuthenticationService';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private getAllMessagesUrl = 'http://localhost:8089/csers/getAllMsg';
  private stompClient: Stomp.Client;
  messages: any[] = [];
  username: string = '';
  connectionEstablished: boolean = false;
  onConnectCallback: () => void;

  // Static token for testing
  private staticToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXJhaGhlbmQ4QGdtY…TEwfQ.26RMslNGBqrLvvZSE4LiyUIaNcFYsZ5Wxv6M-TXPEng';

  constructor(private http: HttpClient, private authService: AuthService) {}

  initializeWebSocketConnection(callback: () => void) {
    this.onConnectCallback = callback;
    const socket = new SockJS(`http://localhost:8089/csers/ws?Authorization=${encodeURIComponent(this.staticToken)}`);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
      this.connectionEstablished = true;
      if (this.onConnectCallback) {
        this.onConnectCallback();
      }
      this.stompClient.subscribe('/topic/public', message => {
        this.handleMessage(JSON.parse(message.body));
      });
    });
  }
  
  getAllMessages() {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.authService.getAccessToken()}`)
     // .set('withCredentials', 'true'); // Set withCredentials to true
    return this.http.get<any[]>(this.getAllMessagesUrl, {headers});
  }
  
  sendMessage(message: string) {
    if (message.trim() !== '') {
      if (this.connectionEstablished) {
        const headers = {
          Authorization: `Bearer ${this.authService.getAccessToken()}`,
         // withCredentials: 'true' // Set withCredentials to true
        };
        this.stompClient.send(
          '/app/chat.sendMessage',
          headers,
          JSON.stringify({ type: 'CHAT', content: message, sender: this.username })
        );
      }
    }
  }

  setUsername(username: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    this.username = username;
    this.addUser();
  }

  
  private addUser() {
    if (this.connectionEstablished && this.username) {
      const headers = {
        Authorization: `Bearer ${this.authService.getAccessToken()}`,
        //withCredentials: 'true' // Set withCredentials to true
      };
      const joinMessage = `${this.username} has joined the chat room`;
      this.stompClient.send(
        '/app/chat.addUser',
        headers,
        JSON.stringify({ type: 'JOIN', content: joinMessage, sender: this.username })
      );
    }
  }
  
  
  private handleMessage(message: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`);
    if (message.type === 'LEAVE') {
      this.messages.push({ sender: this.username, content: `${message.sender} has left the chat room` });
    } else {
      this.messages.push(message);
    }
  }
}
