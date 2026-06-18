import { createContext, useContext } from "react";

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

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("NotificationProvider is missing");
  }

  return context;
};
