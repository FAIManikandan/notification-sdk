import { Notification } from "../types/Notification";
import { NotificationConfig } from "../types/Config";
export interface NotificationContextType {
    config: NotificationConfig;
    notifications: Notification[];
    unreadCount: number;
    refreshNotifications: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
}
export declare const NotificationContext: import("react").Context<NotificationContextType | null>;
export declare const useNotificationContext: () => NotificationContextType;
