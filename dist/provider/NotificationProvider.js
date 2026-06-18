import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { NotificationSocket } from "../services/websocket";
import { fetchNotifications, markNotificationAsRead, deleteNotificationApi, } from "../services/api";
export const NotificationProvider = ({ children, ...config }) => {
    const socketRef = useRef(new NotificationSocket());
    const [notifications, setNotifications] = useState([]);
    const loadNotifications = async () => {
        try {
            const data = await fetchNotifications(config.apiUrl, config.applicationId, config.userId);
            setNotifications(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        loadNotifications();
        if (config.websocketUrl) {
            socketRef.current.connect(config.websocketUrl, (event) => {
                if (event.applicationId === config.applicationId &&
                    event.userId === config.userId) {
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
    const markAsRead = async (id) => {
        await markNotificationAsRead(config.apiUrl, id);
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    };
    const markAllAsRead = async () => {
        const unread = notifications.filter((n) => !n.isRead);
        for (const item of unread) {
            await markNotificationAsRead(config.apiUrl, item.id);
        }
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    };
    const deleteNotification = async (id) => {
        await deleteNotificationApi(config.apiUrl, id);
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };
    return (_jsx(NotificationContext.Provider, { value: {
            config,
            notifications,
            unreadCount,
            refreshNotifications: loadNotifications,
            markAsRead,
            markAllAsRead,
            deleteNotification,
        }, children: children }));
};
