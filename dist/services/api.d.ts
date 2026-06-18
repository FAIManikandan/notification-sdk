import { Notification } from "../types/Notification";
export declare const fetchNotifications: (apiUrl: string, applicationId: string, userId: string) => Promise<Notification[]>;
export declare const markNotificationAsRead: (apiUrl: string, notificationId: string) => Promise<any>;
export declare const deleteNotificationApi: (apiUrl: string, notificationId: string) => Promise<any>;
export declare const createNotification: (apiUrl: string, payload: {
    applicationId: string;
    userId: string;
    title: string;
    message: string;
    type: string;
    category: string;
    priority: string;
}) => Promise<any>;
