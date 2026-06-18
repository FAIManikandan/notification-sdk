import { Notification } from "../types/Notification";
type WebSocketEvent = {
    event: string;
    applicationId: string;
    userId: string;
    data: Notification;
};
type MessageHandler = (event: WebSocketEvent) => void;
export declare class NotificationSocket {
    private socket?;
    private url?;
    private onMessage?;
    private reconnectTimer?;
    connect(url: string, onMessage: MessageHandler): void;
    private detachSocket;
    private open;
    disconnect(): void;
}
export {};
