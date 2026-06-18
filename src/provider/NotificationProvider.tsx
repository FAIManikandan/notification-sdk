import React, { useEffect, useMemo, useRef, useState } from "react";

import { NotificationContext } from "../context/NotificationContext";
import { Notification } from "../types/Notification";
import { NotificationConfig } from "../types/Config";
import { NotificationSocket } from "../services/websocket";
import {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotificationApi,
} from "../services/api";

interface Props extends NotificationConfig {
  children: React.ReactNode;
}

export const NotificationProvider = ({ children, ...config }: Props) => {
  const socketRef = useRef(new NotificationSocket());

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications(
        config.apiUrl,
        config.applicationId,
        config.userId,
      );
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotifications();

    if (config.websocketUrl) {
      socketRef.current.connect(config.websocketUrl, (event) => {
        if (
          event.applicationId === config.applicationId &&
          event.userId === config.userId
        ) {
          setNotifications((prev) => [event.data, ...prev]);
        }
      });
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  const markAsRead = async (id: string) => {
    await markNotificationAsRead(config.apiUrl, id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    for (const item of unread) {
      await markNotificationAsRead(config.apiUrl, item.id);
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = async (id: string) => {
    await deleteNotificationApi(config.apiUrl, id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        config,
        notifications,
        unreadCount,
        refreshNotifications: loadNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
