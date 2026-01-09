import { useEffect, useState } from "react";
import { getNotifications } from "./notificationApi";
import NotificationPanel from "./NotificationPanel";
import "./Notification.css";

function NotificationBell() {
  const userId = 7; // 🔥 MUST match backend
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = () => {
    getNotifications(userId)
      .then(res => {
        console.log("Notifications from backend:", res.data);
        setNotifications(res.data);
      })
      .catch(err => console.error("Notification error", err));
  };

  const unreadCount = notifications.filter(n => !n.readStatus).length;

  return (
    <div className="notification-wrapper">
      <div className="bell" onClick={() => setOpen(!open)}>
        🔔
        {unreadCount > 0 && (
          <span className="badge-count">{unreadCount}</span>
        )}
      </div>

      {open && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default NotificationBell;
