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

  // Sample quick stat cards for top panel
  const statCards = [
    {
      label: "Total Readings",
      value: usageData.length,
      accent: "#1A237E"
    },
    {
      label: "Unpaid Bills",
      value: usageData.reduce((acc, u) => acc + (u.paid === false ? 1 : 0), 0),
      accent: "#E87A41"
    },
    {
      label: "This Month Units",
      value: (usageData.slice(0, 7).reduce((acc, u) => acc + (Number(u.units)||0), 0)),
      accent: "#74a7fe"
    }
  ];

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard officer" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <aside style={{ width: 224, background: '#1A237E', color: '#fff', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: '100vh' }}>
        <h2 style={{ marginBottom: 10 }}>EB Officer</h2>
        <small style={{marginTop:-8, color:'#e7f1ff', fontSize:13}}>Monitor & record customer usage</small>
        <nav style={{ marginTop: 34, width: '100%' }}>
          <button onClick={() => setTab('usage')} className="btn" style={{ width: '100%', marginBottom: 10, background: tab==='usage'?'#74a7fe':'#fff', color: tab==='usage'?'#000':'#1A237E' }}>Usage Entry</button>
          <button onClick={() => setTab('analytics')} className="btn" style={{ width: '100%', marginBottom: 10, background: tab==='analytics'?'#74a7fe':'#fff', color: tab==='analytics'?'#000':'#1A237E' }}>Analytics</button>
          <button onClick={() => setTab('notifications')} className="btn" style={{ width: '100%', background: tab==='notifications'?'#74a7fe':'#fff', color: tab==='notifications'?'#000':'#1A237E' }}>Notifications</button>
        </nav>
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <button className="btn" style={{ background: '#000', color: '#fff', width: '100%' }} onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main style={{ flex: 1, background: '#f9fafe', padding: 32 }}>
        {/* Stat Cards */}
        <div className="flex" style={{gap:22, marginBottom:20, flexWrap:'wrap'}}>
          {statCards.map((card, i) =>
            <div key={i} className="card" style={{
              minWidth: 130, 
              maxWidth:160,
              flex:1,
              padding: '18px 19px',
              borderLeft: `6px solid ${card.accent}`,
              boxShadow: "0 4px 16px #1a237e11"
            }}>
              <div style={{fontWeight:'700', fontSize:'1.36em', color:card.accent, letterSpacing:'0.01em'}}>
                {card.value}
              </div>
              <div style={{fontSize:14, marginTop: 4, color: "var(--text-secondary)"}}>
                {card.label}
              </div>
            </div>
          )}
        </div>

        {tab === 'usage' && (
          <div style={{animation:"fadein .5s"}}>
            <h3 style={{ color: '#1A237E', marginBottom:12 }}>Enter Usage Data</h3>
            <UsageForm onSubmit={onUsageSubmit} />
            {error && <div style={{color:'red', marginTop: 12}}>{error}</div>}
            <h4 style={{ marginTop: 32 }}>Recent Usage Entries</h4>
            <table className="card" style={{ width: '100%', background:"linear-gradient(97deg, #f3f7fa 90%, #e4eafa 102%)" }}>
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
                    <td>₹{u.amount}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {tab === 'analytics' && (
          <div style={{animation:"fadein .4s"}}>
            <AnalyticsChart data={analyticsData} />
          </div>
        )}
        {tab === 'notifications' && (
          <div style={{animation:"fadein .5s"}}>
            <NotificationList notifications={notifications} />
          </div>
        )}
        <style>
          {`
          @keyframes fadein {
            0% { opacity:0; transform:translateY(16px);}
            100% { opacity:1; transform:none;}
          }
          `}
        </style>
      </main>
    </div>
  );
}

export default OfficerDashboard;
