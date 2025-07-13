import React, { useState, useEffect } from 'react';
import { api } from '../api/index';
import NotificationList from '../components/NotificationList';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
function CustomerDashboard({ user, logout }) {
  const [usage, setUsage] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [tab, setTab] = useState('usage');
  const [error] = useState('');
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

  const paidUsage = usage.filter(u => !!u.paid);
  const unpaidUsage = usage.filter(u => !u.paid);
  const totalDue = unpaidUsage.reduce((acc, u) => acc + (+u.amount || 0), 0);

  return (
    <div className="dashboard customer" style={{ display: 'flex', minHeight: '100vh', background:'var(--bg-primary)' }}>
      <aside style={{ width: 210, background: '#74a7fe', color: '#000', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight:'100vh' }}>
        <h2 style={{marginBottom: 10}}>Customer</h2>
        <small style={{marginTop:-8, color:'#265b9b', fontSize:13}}>Monitor your usage & bills</small>
        <nav style={{ marginTop: 34, width: '100%' }}>
          <button onClick={() => setTab('usage')} className="btn" style={{ width: '100%', marginBottom: 10, background: tab==='usage'?'#fff':'#1A237E', color: tab==='usage'?'#1A237E':'#fff', border: tab==='usage'?'1px solid #74a7fe':undefined }}>Usage</button>
          <button onClick={() => setTab('notifications')} className="btn" style={{ width: '100%', background: tab==='notifications'?'#fff':'#1A237E', color: tab==='notifications'?'#1A237E':'#fff' }}>Notifications</button>
        </nav>
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <button className="btn" style={{ background: '#000', color: '#fff', width: '100%' }} onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main style={{ flex: 1, background: '#f9fafe', padding: 32 }}>
        {tab === 'usage' && (
          <div style={{animation:"bouncein .5s"}}>
            <h3 style={{ color: '#1A237E', marginBottom: 12 }}>Your Usage Details</h3>
            <div className="flex" style={{gap:24, marginBottom:16, flexWrap:'wrap'}}>
              <div className="card" style={{ minWidth:130, maxWidth:160, flex:1, padding:'16px 19px', borderLeft:'6px solid #E87A41', background:'#fff9f6' }}>
                <div style={{fontWeight:700, fontSize:'1.36em', color:'#E87A41'}}>{totalDue}</div>
                <div style={{fontSize:14, marginTop: 4, color: "var(--text-secondary)"}}>₹ Due</div>
              </div>
              <div className="card" style={{ minWidth:130, maxWidth:160, flex:1, padding:'16px 19px', borderLeft:'6px solid #1A237E', background: "#f7faff" }}>
                <div style={{fontWeight:700, fontSize:'1.32em', color:'#1A237E'}}>{paidUsage.length}</div>
                <div style={{fontSize:14, marginTop: 4, color: "var(--text-secondary)"}}>Paid Bills</div>
              </div>
              <div className="card" style={{ minWidth:130, maxWidth:160, flex:1, padding:'16px 19px', borderLeft:'6px solid #74a7fe', background: "#f5f7fd" }}>
                <div style={{fontWeight:700, fontSize:'1.26em', color:'#74a7fe'}}>{unpaidUsage.length}</div>
                <div style={{fontSize:14, marginTop: 4, color: "var(--text-secondary)"}}>Unpaid Bills</div>
              </div>
            </div>
            <table className="card" style={{ width: '100%', marginTop: 24, background:"linear-gradient(97deg, #fff 90%, #e4eafe 102%)"}}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th style={{minWidth:65}}>Units</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {usage.map(u =>
                  <tr key={u.id}>
                    <td>{u.date || '-'}</td>
                    <td>{u.units}</td>
                    <td>₹{u.amount}</td>
                    <td>{u.paid ? <span style={{color:"#11a16f"}}>Paid</span> : <span style={{color:"#E87A41"}}>Due</span>}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {tab === 'notifications' && (
          <div style={{animation:"bouncein .6s"}}>
            <NotificationList notifications={notifications} />
          </div>
        )}
        <style>
          {`
          @keyframes bouncein {
            0% {opacity:0; transform:scale(0.96) translateY(16px);}
            70% {transform:scale(1.03);}
            100% {opacity:1; transform:none;}
          }
          `}
        </style>
      </main>
    </div>
  );
}

export default CustomerDashboard;
