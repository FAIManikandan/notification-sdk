import { Notification } from "../types/Notification";

type WebSocketEvent = {
  event: string;
  applicationId: string;
  userId: string;
  data: Notification;
};

type MessageHandler = (event: WebSocketEvent) => void;

export class NotificationSocket {
  private socket?: WebSocket;
  private url?: string;
  private onMessage?: MessageHandler;
  private reconnectTimer?: ReturnType<typeof setTimeout>;

  connect(url: string, onMessage: MessageHandler): void {
    this.url = url;
    this.onMessage = onMessage;
    this.open();
  }

  private detachSocket(): void {
    if (this.socket) {
      this.socket.onmessage = null;
      this.socket.onerror = null;
      this.socket.onclose = null;
      this.socket.close();
      this.socket = undefined;
    }
  }

  private open(): void {
    if (!this.url || !this.onMessage) return;

    this.detachSocket();

    this.socket = new WebSocket(this.url);

    this.socket.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data) as WebSocketEvent;
        this.onMessage!(data);
      } catch {
        // ignore malformed frames
      }
    };

    this.socket.onerror = () => {
      this.socket?.close();
    };

    this.socket.onclose = () => {
      if (this.url) {
        this.reconnectTimer = setTimeout(() => this.open(), 3000);
      }
    };
  }

  disconnect(): void {
    clearTimeout(this.reconnectTimer);
    this.url = undefined;
    this.onMessage = undefined;
    this.detachSocket();
  }
}
