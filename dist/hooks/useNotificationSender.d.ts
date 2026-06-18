import { NotificationCategory, NotificationPriority, NotificationType } from "../types/Notification";
export declare const useNotificationSender: () => {
    sendNotification: (userId: string, title: string, message: string, type: NotificationType, category: NotificationCategory, priority: NotificationPriority) => Promise<any>;
};
