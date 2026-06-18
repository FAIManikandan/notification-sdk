export const fetchNotifications = async (apiUrl, applicationId, userId) => {
    const response = await fetch(`${apiUrl}/notifications?applicationId=${applicationId}&userId=${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch notifications");
    }
    return response.json();
};
export const markNotificationAsRead = async (apiUrl, notificationId) => {
    const response = await fetch(`${apiUrl}/notifications/${notificationId}/read`, {
        method: "PUT",
    });
    if (!response.ok) {
        throw new Error("Failed to mark notification as read");
    }
    return response.json();
};
export const deleteNotificationApi = async (apiUrl, notificationId) => {
    const response = await fetch(`${apiUrl}/notifications/${notificationId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete notification");
    }
    return response.json();
};
export const createNotification = async (apiUrl, payload) => {
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
