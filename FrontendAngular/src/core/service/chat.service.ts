import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private getAllMessagesUrl = 'http://localhost:8089/csers/incident/getAllMsg';
  private stompClient: Stomp.Client;
  messages: any[] = [];
  username: string = '';
  connectionEstablished: boolean = false;
  onConnectCallback: () => void;

  constructor(private http: HttpClient) { }

  initializeWebSocketConnection(callback: () => void) {
    this.onConnectCallback = callback;
    const socket = new SockJS('http://localhost:8089/csers/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
      this.connectionEstablished = true;
      if (this.onConnectCallback) {
        this.onConnectCallback();
      }
      this.stompClient.subscribe('/topic/public', (message) => {
        this.handleMessage(JSON.parse(message.body));
      });
    });
  }

  getAllMessages() {
    return this.http.get<any[]>(this.getAllMessagesUrl);
  }

  sendMessage(message: string) {
    if (message.trim() !== '') {
      if (this.connectionEstablished) {
        this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify({ type: 'CHAT', content: message, sender: this.username }));
      }
    }
  }

  setUsername(username: string) {
    this.username = username;
    this.addUser();
  }

  private addUser() {
    if (this.connectionEstablished && this.username) {
      const joinMessage = `${this.username} has joined the chat room`;
      this.stompClient.send('/app/chat.addUser', {}, JSON.stringify({ type: 'JOIN', content: joinMessage, sender: this.username }));
    }
  }

  private handleMessage(message: any) {
    if (message.type === 'LEAVE') {
      this.messages.push({ sender: this.username, content: `${message.sender} has left the chat room` });
    } else {
      this.messages.push(message);
    }
  }
}