import React, { useState } from 'react';
import { api } from '../api/index';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
function Register({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('officer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // officerExtra can contain additional info (like badge ID), extend as needed
  const [officerExtra, setOfficerExtra] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const resp = await api.register(username, password, role, role === 'officer' ? officerExtra : {});
      setAuth({ ...resp, role });
      if (role === 'officer') {
        navigate('/officer/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: '64px auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit} className="card" style={{ padding: 32, borderRadius: 8 }}>
        <div>
          <label>
            Role:
            <select value={role} onChange={e => setRole(e.target.value)} required>
              <option value="officer">Officer</option>
              <option value="customer">Customer</option>
            </select>
          </label>
        </div>
        <div style={{ marginTop: 16 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div style={{ marginTop: 16 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {role === 'officer' &&
          <div style={{ marginTop: 16 }}>
            <input
              type="text"
              placeholder="Officer Badge ID"
              value={officerExtra.badgeId || ''}
              onChange={e => setOfficerExtra(o => ({ ...o, badgeId: e.target.value }))}
            />
          </div>
        }
        <button type="submit" className="btn btn-large" style={{ marginTop: 24, width: '100%' }}>Register</button>
        <div style={{ marginTop: 10 }}>
          <span>Already have an account?</span> <button type="button" style={{background: 'none', border: 'none', color:'#1A237E', textDecoration:'underline'}} onClick={() => navigate('/login')}>Login</button>
        </div>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </form>
    </div>
  );
}

export default Register;
