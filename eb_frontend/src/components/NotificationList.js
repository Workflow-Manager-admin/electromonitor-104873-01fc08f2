import React from 'react';

// PUBLIC_INTERFACE
function NotificationList({ notifications }) {
  if (!notifications || !notifications.length) {
    return (
      <div className="card" style={{ maxWidth: 460, color: "var(--text-muted)", textAlign: "center" }}>
        No notifications.
      </div>
    );
  }
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxWidth: 650 }}>
      {notifications.map((n, i) =>
        <li
          key={n.id || i}
          className="card"
          style={{
            marginBottom: 16,
            padding: 20,
            borderLeft: `4px solid ${n.type === 'payment' ? 'var(--primary)' : 'var(--secondary)'}`,
            boxShadow: n.type === 'payment' ? '0 2px 18px 0 rgba(232,122,65,0.13)' : undefined,
            background:
              n.type === 'payment' ? 'linear-gradient(93deg, #fff7f3 40%, #f9fafe 100%)' : undefined,
          }}>
          <div className="notif-title" style={{ fontWeight: '700', marginBottom: 7, color: "var(--primary)" }}>
            {n.title || (n.type === 'payment' ? '🔔 Payment Due' : 'Notification')}
          </div>
          <div style={{ color: "var(--text-primary)", fontSize: "1.01em", marginBottom: 2 }}>
            {n.message || n.body}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8, fontStyle: "italic" }}>
            {n.date ? (new Date(n.date)).toLocaleString() : null}
          </div>
        </li>
      )}
    </ul>
  );
}

export default NotificationList;
