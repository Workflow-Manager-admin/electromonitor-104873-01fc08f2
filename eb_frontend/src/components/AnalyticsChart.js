import React from 'react';

// PUBLIC_INTERFACE
function AnalyticsChart({ data }) {
  if (!data || !data.length) {
    return (
      <div className="card" style={{ color: 'var(--text-muted)', textAlign: "center" }}>
        No analytics data available.
      </div>
    );
  }
  // Each item: { label, value }
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <div className="card" style={{ padding: 28 }}>
      <h4 style={{ marginBottom: 20, color: "var(--primary)", fontWeight: 700, letterSpacing: "0.01em" }}>
        Usage Analytics
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 19 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <span style={{
              minWidth: 77,
              color: 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: "1rem"
            }}>
              {d.label}
            </span>
            <div style={{
              background: "linear-gradient(90deg, var(--secondary), #fff 150%)",
              height: 22,
              width: `${Math.round((d.value / maxValue) * 240) || 30}px`,
              minWidth: 30,
              borderRadius: 12,
              boxShadow: "0 1.5px 8px 0 rgba(116,167,254,0.05)",
              position: "relative",
              marginRight: 12,
              transition: "width .22s"
            }} title={d.value.toString()} />
            <span style={{ fontWeight: 600, color: "var(--primary)", fontSize: "1.05em" }}>
              {d.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AnalyticsChart;
