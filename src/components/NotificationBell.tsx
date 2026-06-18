import { useState } from "react";

import { useNotifications } from "../hooks/useNotifications";

import { NotificationPanel } from "./NotificationPanel";

export const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  const { unreadCount, config } = useNotifications();

  const theme = config.theme;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          border: "none",
          background: "transparent",
          fontSize: "24px",
          position: "relative",
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",

              background: theme?.primaryColor || "#1976d2",

              color: "#fff",

              borderRadius: "50%",

              minWidth: "20px",

              height: "20px",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontSize: "12px",

              fontWeight: 600,
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && <NotificationPanel onClose={() => setOpen(false)} />}
    </div>
  );
};
