import { createNotification } from "../services/api";
import {
  NotificationCategory,
  NotificationPriority,
  NotificationType,
} from "../types/Notification";

import { useNotifications } from "./useNotifications";

export const useNotificationSender = () => {
  const { config } = useNotifications();

  const sendNotification = async (
    userId: string,
    title: string,
    message: string,
    type: NotificationType,
    category: NotificationCategory,
    priority: NotificationPriority,
  ) => {
    return createNotification(config.apiUrl, {
      applicationId: config.applicationId,
      userId,
      title,
      message,
      type,
      category,
      priority,
    });
  };

  return {
    sendNotification,
  };
};
