import React, { useState, useEffect } from 'react';
import { api } from '../api/index';
import UsageForm from '../components/UsageForm';
import AnalyticsChart from '../components/AnalyticsChart';
import NotificationList from '../components/NotificationList';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
function OfficerDashboard({ user, logout }) {
  const [usageData, setUsageData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [tab, setTab] = useState('usage');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      navigate('/login');
      return;
    }
    api.getOfficerDashboard(user.token).then(setUsageData).catch(() => {});
    api.getAnalytics(user.token).then(setAnalyticsData).catch(() => {});
    api.getNotificationsOfficer(user.token).then(setNotifications).catch(() => {});
  }, [user, navigate]);

  const onUsageSubmit = async (usage) => {
    setError('');
    try {
      await api.submitUsage(usage, user.token);
      api.getOfficerDashboard(user.token).then(setUsageData);
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard officer" style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 220, background: '#1A237E', color: '#fff', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h2>EB Officer</h2>
        <nav style={{ marginTop: 40, width: '100%' }}>
          <button onClick={() => setTab('usage')} className="btn" style={{ width: '100%', marginBottom: 10, background: tab==='usage'?'#74a7fe':'#fff', color: tab==='usage'?'#000':'#1A237E' }}>Usage Entry</button>
          <button onClick={() => setTab('analytics')} className="btn" style={{ width: '100%', marginBottom: 10, background: tab==='analytics'?'#74a7fe':'#fff', color: tab==='analytics'?'#000':'#1A237E' }}>Analytics</button>
          <button onClick={() => setTab('notifications')} className="btn" style={{ width: '100%', background: tab==='notifications'?'#74a7fe':'#fff', color: tab==='notifications'?'#000':'#1A237E' }}>Notifications</button>
        </nav>
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <button className="btn" style={{ background: '#000', color: '#fff', width: '100%' }} onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main style={{ flex: 1, background: '#f9fafe', padding: 32 }}>
        {tab === 'usage' && (
          <div>
            <h3 style={{ color: '#1A237E' }}>Enter Usage Data</h3>
            <UsageForm onSubmit={onUsageSubmit} />
            {error && <div style={{color:'red', marginTop: 12}}>{error}</div>}
            <h4 style={{ marginTop: 32 }}>Recent Usage Entries</h4>
            <table className="card" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Units</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {usageData.map(u =>
                  <tr key={u.id}>
                    <td>{u.customerName || u.customer_id}</td>
                    <td>{u.date || '-'}</td>
                    <td>{u.units}</td>
                    <td>{u.amount}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {tab === 'analytics' && (
          <div>
            <AnalyticsChart data={analyticsData} />
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

export default OfficerDashboard;
