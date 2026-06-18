import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNotifications } from "../hooks/useNotifications";
const PRIORITY_CONFIG = {
    CRITICAL: {
        borderColor: "#dc2626",
        badgeBackground: "#fef2f2",
        badgeColor: "#dc2626",
        unreadBackground: "rgba(220,38,38,0.07)",
    },
    HIGH: {
        borderColor: "#ea580c",
        badgeBackground: "#fff7ed",
        badgeColor: "#ea580c",
        unreadBackground: "rgba(234,88,12,0.07)",
    },
    MEDIUM: {
        borderColor: "#ca8a04",
        badgeBackground: "#fffbeb",
        badgeColor: "#ca8a04",
        unreadBackground: "rgba(202,138,4,0.07)",
    },
    LOW: {
        borderColor: "#9ca3af",
        badgeBackground: "#f9fafb",
        badgeColor: "#6b7280",
        unreadBackground: "rgba(25,118,210,0.06)",
    },
};
const CATEGORY_ICON = {
    TASK: "📋",
    APPROVAL: "✅",
    SYSTEM: "⚙️",
    SECURITY: "🔒",
    CHAT: "💬",
};
const TYPE_ICON = {
    success: "✅",
    warning: "⚠️",
    error: "❌",
    critical: "🚨",
    info: "ℹ️",
};
const badgeBase = {
    display: "inline-flex",
    alignItems: "center",
    gap: "3px",
    padding: "2px 7px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.02em",
};
export const NotificationPanel = ({ onClose }) => {
    const { notifications, markAsRead, markAllAsRead, deleteNotification, config, } = useNotifications();
    const theme = config.theme;
    return (_jsxs("div", { style: {
            position: "absolute",
            top: "40px",
            right: 0,
            width: "400px",
            maxHeight: "500px",
            overflowY: "auto",
            background: (theme === null || theme === void 0 ? void 0 : theme.backgroundColor) || "#fff",
            color: (theme === null || theme === void 0 ? void 0 : theme.textColor) || "#111",
            border: "1px solid #e5e7eb",
            borderRadius: (theme === null || theme === void 0 ? void 0 : theme.borderRadius) || "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            zIndex: 9999,
            fontFamily: (theme === null || theme === void 0 ? void 0 : theme.fontFamily) || "system-ui, sans-serif",
        }, children: [_jsxs("div", { style: {
                    padding: "14px 16px",
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "sticky",
                    top: 0,
                    background: (theme === null || theme === void 0 ? void 0 : theme.backgroundColor) || "#fff",
                    zIndex: 1,
                }, children: [_jsx("strong", { style: { fontSize: "15px" }, children: "Notifications" }), _jsxs("div", { style: { display: "flex", gap: "8px" }, children: [_jsx("button", { onClick: markAllAsRead, style: {
                                    fontSize: "12px",
                                    padding: "4px 10px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    background: "#f9fafb",
                                    cursor: "pointer",
                                    color: "#374151",
                                }, children: "Mark all read" }), _jsx("button", { onClick: onClose, style: {
                                    fontSize: "14px",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    color: "#6b7280",
                                    padding: "4px 6px",
                                }, children: "\u2715" })] })] }), notifications.length === 0 && (_jsxs("div", { style: {
                    padding: "40px 16px",
                    textAlign: "center",
                    color: "#9ca3af",
                    fontSize: "14px",
                }, children: [_jsx("div", { style: { fontSize: "32px", marginBottom: "8px" }, children: "\uD83D\uDD15" }), "No notifications"] })), notifications.map((notification) => {
                var _a, _b;
                const priority = (_a = PRIORITY_CONFIG[notification.priority]) !== null && _a !== void 0 ? _a : PRIORITY_CONFIG.LOW;
                return (_jsx("div", { style: {
                        padding: "12px 14px",
                        borderBottom: "1px solid #f3f4f6",
                        borderLeft: `4px solid ${priority.borderColor}`,
                        background: notification.isRead
                            ? "transparent"
                            : priority.unreadBackground,
                        transition: "background 0.2s",
                    }, children: _jsxs("div", { style: {
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "8px",
                        }, children: [_jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsxs("div", { style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            marginBottom: "4px",
                                        }, children: [_jsx("span", { children: (_b = TYPE_ICON[notification.type]) !== null && _b !== void 0 ? _b : "ℹ️" }), _jsx("strong", { style: {
                                                    fontSize: "14px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }, children: notification.title })] }), _jsx("div", { style: {
                                            fontSize: "13px",
                                            color: "#4b5563",
                                            marginBottom: "8px",
                                            lineHeight: "1.4",
                                        }, children: notification.message }), _jsxs("div", { style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            flexWrap: "wrap",
                                        }, children: [_jsx("span", { style: {
                                                    ...badgeBase,
                                                    background: priority.badgeBackground,
                                                    color: priority.badgeColor,
                                                    border: `1px solid ${priority.borderColor}33`,
                                                }, children: notification.priority }), _jsxs("span", { style: {
                                                    ...badgeBase,
                                                    background: "#f3f4f6",
                                                    color: "#374151",
                                                    border: "1px solid #e5e7eb",
                                                }, children: [CATEGORY_ICON[notification.category], " ", notification.category] }), _jsx("span", { style: {
                                                    fontSize: "11px",
                                                    color: "#9ca3af",
                                                    marginLeft: "auto",
                                                }, children: notification.createdAt })] })] }), _jsxs("div", { style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    flexShrink: 0,
                                }, children: [!notification.isRead && (_jsx("button", { onClick: () => markAsRead(notification.id), title: "Mark as read", style: {
                                            border: "none",
                                            background: "none",
                                            cursor: "pointer",
                                            fontSize: "16px",
                                            padding: "2px",
                                            color: "#10b981",
                                        }, children: "\u2713" })), _jsx("button", { onClick: () => deleteNotification(notification.id), title: "Delete", style: {
                                            border: "none",
                                            background: "none",
                                            cursor: "pointer",
                                            fontSize: "14px",
                                            padding: "2px",
                                            color: "#9ca3af",
                                        }, children: "\uD83D\uDDD1" })] })] }) }, notification.id));
            })] }));
};
