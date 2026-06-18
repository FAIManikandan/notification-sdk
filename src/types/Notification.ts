export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "critical";

export type NotificationCategory =
  | "TASK"
  | "APPROVAL"
  | "SYSTEM"
  | "SECURITY"
  | "CHAT";

export type NotificationPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Notification {
  id: string;

  applicationId: string;

  userId: string;

  title: string;

  message: string;

  type: NotificationType;

  category: NotificationCategory;

  priority: NotificationPriority;

  isRead: boolean;

  createdAt: string;
}
