import React from 'react';

// PUBLIC_INTERFACE
function NotificationList({ notifications }) {
  if (!notifications || !notifications.length) {
    return <div>No notifications.</div>;
  }
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxWidth: 600 }}>
      {notifications.map((n, i) =>
        <li key={n.id || i} className="card" style={{ margin: '12px 0', padding: 16, borderLeft: `4px solid ${n.type === 'payment' ? '#1A237E' : '#74a7fe'}` }}>
          <div style={{ fontWeight: 'bold', color: '#1A237E' }}>
            {n.title || (n.type === 'payment' ? 'Payment Due' : 'Notification')}
          </div>
          <div>{n.message || n.body}</div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{n.date ? (new Date(n.date)).toLocaleString() : null}</div>
        </li>
      )}
    </ul>
  );
}

export default NotificationList;
