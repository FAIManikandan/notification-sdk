import { createNotification } from "../services/api";
import { useNotifications } from "./useNotifications";
export const useNotificationSender = () => {
    const { config } = useNotifications();
    const sendNotification = async (userId, title, message, type, category, priority) => {
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
