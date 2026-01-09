function NotificationPanel({ notifications, onClose }) {
    return (
      <div className="notification-panel">
        <h4>Notifications</h4>
  
        {notifications.length === 0 && (
          <p className="empty">No notifications</p>
        )}
  
        {notifications.map(n => (
          <div className="notification-card" key={n.id}>
            <span className={`type ${n.type.toLowerCase()}`}>
              {n.type}
            </span>
  
            <h5>{n.title}</h5>
            <p>{n.message}</p>
  
            <small>
              {new Date(n.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
  
        <button className="view-all" onClick={onClose}>
          Close
        </button>
      </div>
    );
  }
  
  export default NotificationPanel;
  