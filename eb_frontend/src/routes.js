import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import OfficerDashboard from './pages/OfficerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

// AuthContext for session propagation
const AuthContext = React.createContext();

// PUBLIC_INTERFACE
export function useAuth() {
  return React.useContext(AuthContext);
}

// PUBLIC_INTERFACE
function Router() {
  // Try to persist session from local storage
  const [auth, setAuthState] = useState(() => {
    const session = localStorage.getItem('auth');
    return session ? JSON.parse(session) : null;
  });

  const setAuth = (val) => {
    setAuthState(val);
    if (val) localStorage.setItem('auth', JSON.stringify(val));
    else localStorage.removeItem('auth');
  };

  const logout = () => setAuth(null);

  // For nested components to access auth state
  const contextValue = { ...auth, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={auth?.role === 'officer' ? '/officer/dashboard' : (auth?.role === 'customer' ? '/customer/dashboard' : '/login')} />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register setAuth={setAuth} />} />
          <Route path="/officer/dashboard" element={auth?.role === 'officer' ? <OfficerDashboard user={auth} logout={logout} /> : <Navigate to="/login" />} />
          <Route path="/customer/dashboard" element={auth?.role === 'customer' ? <CustomerDashboard user={auth} logout={logout} /> : <Navigate to="/login" />} />
          <Route path="*" element={<div style={{ padding: 40 }}>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default Router;
