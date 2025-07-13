//
// Mock API client for eb_frontend: pure frontend demo without backend/API dependencies.
//
// - All methods return static mock/demo data with artificial latency for realism.
// - Simulates expected officer & customer flows per requirements.
//

// Demo data stores (non-persistent)
let officerDemoSession = { username: "officer1", token: "demo-officer-token", role: "officer" };
let customerDemoSession = { username: "customer1", token: "demo-customer-token", role: "customer" };

let demoUsages = [
  { id: 1, customer_id: "C001", customerName: "Vignesh", date: "2024-07-06", units: 66, amount: 370, paid: false },
  { id: 2, customer_id: "C002", customerName: "Priya", date: "2024-07-05", units: 50, amount: 295, paid: true },
  { id: 3, customer_id: "C003", customerName: "Arjun", date: "2024-07-04", units: 89, amount: 500, paid: false }
];

let demoAnalytics = [
  { label: "This Month", value: 210 },
  { label: "Last Month", value: 175 },
  { label: "Peak (kWh)", value: 110 },
  { label: "Avg/Day", value: 7.6 }
];

let officerNotifications = [
  { id: "n1", type: "alert", title: "New Reading Submitted", message: "Reading for Vignesh (C001): 66 units.", date: "2024-07-06T13:23:00" },
  { id: "n2", type: "info", title: "Feedback Received", message: "Customer Priya sent feedback on last bill.", date: "2024-07-05T09:10:31" }
];

let customerNotifications = [
  { id: "c1", type: "payment", title: "Payment Due!", message: "Amount ₹370 due for 66 units (July).", date: "2024-07-08T09:33:00" },
  { id: "c2", type: "alert", title: "Usage Update", message: "Your July reading is logged: 66 units.", date: "2024-07-06T13:23:00" }
];

// Helper: artificial async delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// PUBLIC_INTERFACE
export const api = {
  // Authentication
  login: async (username, password, role) => {
    await delay(400);
    if (role === "officer" && username && password) {
      return { ...officerDemoSession, username };
    }
    if (role === "customer" && username && password) {
      return { ...customerDemoSession, username };
    }
    throw new Error("Invalid credentials");
  },

  register: async (username, password, role, extra) => {
    await delay(500);
    if (!username || !password) throw new Error("All fields required");
    if (role === "officer") {
      officerDemoSession = { ...officerDemoSession, username };
      return { ...officerDemoSession, username };
    }
    // else role === "customer"
    customerDemoSession = { ...customerDemoSession, username };
    return { ...customerDemoSession, username };
  },

  // Officer endpoints
  getOfficerDashboard: async (token) => {
    await delay(260);
    return demoUsages.slice().reverse();
  },
  submitUsage: async (data, token) => {
    await delay(300);
    // Minimal validation
    const nextId = 1 + (demoUsages.length ? Math.max(...demoUsages.map(u => u.id)) : 0);
    demoUsages.push({
      id: nextId,
      customer_id: data.customer_id || "C000X",
      customerName: "Demo Name",
      date: data.date,
      units: data.units,
      amount: Math.round(5.5 * data.units),
      paid: false
    });
    officerNotifications.unshift({
      id: `n${nextId + 100}`,
      type: "alert",
      title: "Usage Submitted",
      message: `Reading for ${data.customer_id}: ${data.units} units.`,
      date: new Date().toISOString()
    });
    return { ok: true };
  },
  getAnalytics: async (token) => {
    await delay(180);
    // Dynamically calculate analytics demo (optional variation)
    return [
      { label: "This Month", value: demoUsages.reduce((acc, u) => acc + u.units, 0) },
      ...demoAnalytics.slice(1)
    ];
  },
  getNotificationsOfficer: async (token) => {
    await delay(100);
    return officerNotifications.slice(0, 7);
  },

  // Customer endpoints
  getCustomerDashboard: async (token) => {
    await delay(260);
    // Only show current user's readings and mask other names
    return demoUsages
      .filter(u => u.customer_id === "C001" || u.customer_id === "customer1" || u.customer_id.toLowerCase().startsWith("c"))
      .map(u => ({
        ...u,
        customerName: undefined // do not expose other names, matches requirement
      }))
      .slice(-6)
      .reverse();
  },
  getNotificationsCustomer: async (token) => {
    await delay(120);
    return customerNotifications.slice(0, 6);
  }
};
