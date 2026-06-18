import { Notification } from "../types/Notification";

export const fetchNotifications = async (
  apiUrl: string,
  applicationId: string,
  userId: string,
): Promise<Notification[]> => {
  const response = await fetch(
    `${apiUrl}/notifications?applicationId=${applicationId}&userId=${userId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};

export const markNotificationAsRead = async (
  apiUrl: string,
  notificationId: string,
) => {
  const response = await fetch(
    `${apiUrl}/notifications/${notificationId}/read`,
    {
      method: "PUT",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to mark notification as read");
  }

  return response.json();
};

export const deleteNotificationApi = async (
  apiUrl: string,
  notificationId: string,
) => {
  const response = await fetch(`${apiUrl}/notifications/${notificationId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete notification");
  }

  return response.json();
};

export const createNotification = async (
  apiUrl: string,
  payload: {
    applicationId: string;
    userId: string;
    title: string;
    message: string;
    type: string;
    category: string;
    priority: string;
  },
) => {
  const response = await fetch(`${apiUrl}/notifications`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create notification");
  }

  return response.json();
};
