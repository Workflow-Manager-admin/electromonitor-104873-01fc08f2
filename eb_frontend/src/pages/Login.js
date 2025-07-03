import React, { useState } from 'react';
import { api } from '../api/index';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('officer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const resp = await api.login(username, password, role);
      setAuth({ ...resp, role });
      if (role === 'officer') {
        navigate('/officer/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: '64px auto' }}>
      <h2>Login</h2>
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
        <button type="submit" className="btn btn-large" style={{ marginTop: 24, width: '100%' }}>Sign In</button>
        <div style={{ marginTop: 10 }}>
          <span>Don't have an account?</span> <button type="button" style={{background: 'none', border: 'none', color:'#1A237E', textDecoration:'underline'}} onClick={() => navigate('/register')}>Sign Up</button>
        </div>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </form>
    </div>
  );
}

export default Login;
