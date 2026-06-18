import { useNotifications } from "../hooks/useNotifications";
import { NotificationPriority, NotificationCategory } from "../types/Notification";

interface Props {
  onClose: () => void;
}

const PRIORITY_CONFIG: Record<
  NotificationPriority,
  { borderColor: string; badgeBackground: string; badgeColor: string; unreadBackground: string }
> = {
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

const CATEGORY_ICON: Record<NotificationCategory, string> = {
  TASK: "📋",
  APPROVAL: "✅",
  SYSTEM: "⚙️",
  SECURITY: "🔒",
  CHAT: "💬",
};

const TYPE_ICON: Record<string, string> = {
  success: "✅",
  warning: "⚠️",
  error: "❌",
  critical: "🚨",
  info: "ℹ️",
};

const badgeBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "3px",
  padding: "2px 7px",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.02em",
};

export const NotificationPanel = ({ onClose }: Props) => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    config,
  } = useNotifications();

  const theme = config.theme;

  return (
    <div
      style={{
        position: "absolute",
        top: "40px",
        right: 0,
        width: "400px",
        maxHeight: "500px",
        overflowY: "auto",
        background: theme?.backgroundColor || "#fff",
        color: theme?.textColor || "#111",
        border: "1px solid #e5e7eb",
        borderRadius: theme?.borderRadius || "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        zIndex: 9999,
        fontFamily: theme?.fontFamily || "system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          background: theme?.backgroundColor || "#fff",
          zIndex: 1,
        }}
      >
        <strong style={{ fontSize: "15px" }}>Notifications</strong>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={markAllAsRead}
            style={{
              fontSize: "12px",
              padding: "4px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              background: "#f9fafb",
              cursor: "pointer",
              color: "#374151",
            }}
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            style={{
              fontSize: "14px",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "#6b7280",
              padding: "4px 6px",
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div
          style={{
            padding: "40px 16px",
            textAlign: "center",
            color: "#9ca3af",
            fontSize: "14px",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔕</div>
          No notifications
        </div>
      )}

      {/* Notification List */}
      {notifications.map((notification) => {
        const priority =
          PRIORITY_CONFIG[notification.priority] ?? PRIORITY_CONFIG.LOW;

        return (
          <div
            key={notification.id}
            style={{
              padding: "12px 14px",
              borderBottom: "1px solid #f3f4f6",
              borderLeft: `4px solid ${priority.borderColor}`,
              background: notification.isRead
                ? "transparent"
                : priority.unreadBackground,
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              {/* Left: content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Title row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "4px",
                  }}
                >
                  <span>{TYPE_ICON[notification.type] ?? "ℹ️"}</span>
                  <strong
                    style={{
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {notification.title}
                  </strong>
                </div>

                {/* Message */}
                <div
                  style={{
                    fontSize: "13px",
                    color: "#4b5563",
                    marginBottom: "8px",
                    lineHeight: "1.4",
                  }}
                >
                  {notification.message}
                </div>

                {/* Badges row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Priority badge */}
                  <span
                    style={{
                      ...badgeBase,
                      background: priority.badgeBackground,
                      color: priority.badgeColor,
                      border: `1px solid ${priority.borderColor}33`,
                    }}
                  >
                    {notification.priority}
                  </span>

                  {/* Category badge */}
                  <span
                    style={{
                      ...badgeBase,
                      background: "#f3f4f6",
                      color: "#374151",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    {CATEGORY_ICON[notification.category]}{" "}
                    {notification.category}
                  </span>

                  {/* Timestamp */}
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      marginLeft: "auto",
                    }}
                  >
                    {notification.createdAt}
                  </span>
                </div>
              </div>

              {/* Right: actions */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  flexShrink: 0,
                }}
              >
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      padding: "2px",
                      color: "#10b981",
                    }}
                  >
                    ✓
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "2px",
                    color: "#9ca3af",
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
