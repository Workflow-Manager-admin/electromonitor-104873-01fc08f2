//
// API client for eb_backend REST API integration
//

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://vscode-internal-0866-beta.beta01.cloud.kavia.ai:3001';

async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let msg;
    try {
      msg = (await res.json()).detail || res.statusText;
    } catch {
      msg = res.statusText;
    }
    throw new Error(msg);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export const api = {
  // Authentication
  login: (username, password, role) =>
    apiRequest('/auth/login', { method: 'POST', body: { username, password, role } }),
  register: (username, password, role, extra) =>
    apiRequest('/auth/register', { method: 'POST', body: { username, password, role, ...extra } }),

  // Officer endpoints
  getOfficerDashboard: (token) =>
    apiRequest('/officer/dashboard', { token }),
  submitUsage: (data, token) =>
    apiRequest('/officer/usage', { method: 'POST', body: data, token }),
  getAnalytics: (token) =>
    apiRequest('/officer/analytics', { token }),
  getNotificationsOfficer: (token) =>
    apiRequest('/officer/notifications', { token }),

  // Customer endpoints
  getCustomerDashboard: (token) =>
    apiRequest('/customer/dashboard', { token }),
  getNotificationsCustomer: (token) =>
    apiRequest('/customer/notifications', { token }),
};

