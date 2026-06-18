import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { NotificationPanel } from "./NotificationPanel";
export const NotificationBell = () => {
    const [open, setOpen] = useState(false);
    const { unreadCount, config } = useNotifications();
    const theme = config.theme;
    return (_jsxs("div", { style: {
            position: "relative",
            display: "inline-block",
        }, children: [_jsxs("button", { onClick: () => setOpen(!open), style: {
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    fontSize: "24px",
                    position: "relative",
                }, children: ["\uD83D\uDD14", unreadCount > 0 && (_jsx("span", { style: {
                            position: "absolute",
                            top: "-5px",
                            right: "-10px",
                            background: (theme === null || theme === void 0 ? void 0 : theme.primaryColor) || "#1976d2",
                            color: "#fff",
                            borderRadius: "50%",
                            minWidth: "20px",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: 600,
                        }, children: unreadCount }))] }), open && _jsx(NotificationPanel, { onClose: () => setOpen(false) })] }));
};
