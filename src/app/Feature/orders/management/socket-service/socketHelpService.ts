import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketHelpService {
  public connectionFailed = false;
  private maxReconnectionAttempts = 2;
  private reconnectionAttempts = 0; 
  private connectionErrorSubject = new Subject<string>();
  constructor(private socket: Socket) {
    // Global error listener
    this.socket.on('connect_error', (err: any) => {
      console.error('Socket connection error:', err);
      this.handleReconnection();
    });

    this.socket.on('connect', () => {
      this.resetReconnectionState();
    });

    this.socket.on('disconnect', (reason: string) => {
      console.warn('Socket disconnected:', reason);
      if (!this.connectionFailed) {
        this.handleReconnection();
      }
    });
  }

  // Listen for new data
  onNewData():Observable<any> {
    return new Observable((observer) => {
      this.socket.fromEvent('dataUpdate').subscribe({
        next: (data) => observer.next(data),
        error: (err) => {
          console.error('Socket error:', err);
          observer.error(err);
        },
      });
    });
  }

  // Emit initial connection message if needed
  emitInitial():void {
    this.socket.emit('initialData', { message: 'Client connected' });
  }

  // handel error and check max reconnection attempts 
  private handleReconnection(): void {
    if (this.reconnectionAttempts < this.maxReconnectionAttempts) {
      this.reconnectionAttempts++;
      setTimeout(() => {
        this.socket.connect();
      }, 7000);
    } else {
      this.connectionFailed = true;
      this.socket.disconnect();
      this.connectionErrorSubject.next('Max Reconnection Attempts Reached. Connection Failed Permanently.');
    }
  }

  // send max attempts fail error to user 
  getConnectionError(): Observable<string> {
    return this.connectionErrorSubject.asObservable();
  }

  // when it's connecting successfully reset attempts 
  private resetReconnectionState(): void {
    this.connectionFailed = false;
    this.reconnectionAttempts = 0;
  }
}