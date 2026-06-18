import { createContext, useContext } from "react";
export const NotificationContext = createContext(null);
export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("NotificationProvider is missing");
    }
    return context;
};
