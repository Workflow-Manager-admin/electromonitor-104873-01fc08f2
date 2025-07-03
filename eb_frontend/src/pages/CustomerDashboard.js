import React, { useState, useEffect } from 'react';
import { api } from '../api/index';
import NotificationList from '../components/NotificationList';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
function CustomerDashboard({ user, logout }) {
  const [usage, setUsage] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [tab, setTab] = useState('usage');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      navigate('/login');
      return;
    }
    api.getCustomerDashboard(user.token).then(setUsage).catch(() => {});
    api.getNotificationsCustomer(user.token).then(setNotifications).catch(() => {});
  }, [user, navigate]);

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalDue = usage.reduce((acc, u) => acc + (+u.amount || 0), 0);

  return (
    <div className="dashboard customer" style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 200, background: '#74a7fe', color: '#000', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h2>Customer</h2>
        <nav style={{ marginTop: 40, width: '100%' }}>
          <button onClick={() => setTab('usage')} className="btn" style={{ width: '100%', marginBottom: 10, background: tab==='usage'?'#fff':'#1A237E', color: tab==='usage'?'#1A237E':'#fff', border: tab==='usage'?'1px solid #74a7fe':undefined }}>Usage</button>
          <button onClick={() => setTab('notifications')} className="btn" style={{ width: '100%', background: tab==='notifications'?'#fff':'#1A237E', color: tab==='notifications'?'#1A237E':'#fff' }}>Notifications</button>
        </nav>
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <button className="btn" style={{ background: '#000', color: '#fff', width: '100%' }} onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main style={{ flex: 1, background: '#f9fafe', padding: 32 }}>
        {tab === 'usage' && (
          <div>
            <h3 style={{ color: '#1A237E' }}>Your Usage Details</h3>
            <div className="card" style={{ maxWidth: 320, margin: '24px 0', padding: '16px 32px' }}>
              <div><strong>Total Due: </strong>₹ {totalDue}</div>
            </div>
            <table className="card" style={{ width: '100%', marginTop: 24 }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Units</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {usage.map(u =>
                  <tr key={u.id}>
                    <td>{u.date || '-'}</td>
                    <td>{u.units}</td>
                    <td>{u.amount}</td>
                    <td>{u.paid ? 'Paid' : 'Due'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {tab === 'notifications' && (
          <div>
            <NotificationList notifications={notifications} />
          </div>
        )}
      </main>
    </div>
  );
}

export default CustomerDashboard;
