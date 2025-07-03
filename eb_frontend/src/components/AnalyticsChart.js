import React from 'react';

// PUBLIC_INTERFACE
function AnalyticsChart({ data }) {
  if (!data || !data.length) {
    return <div>No analytics data available.</div>;
  }
  // Each item: { label, value }
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <div className="card" style={{ padding: 24 }}>
      <h4 style={{marginBottom:20}}>Usage Analytics</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.map((d,i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{minWidth:80}}>{d.label}</span>
            <div style={{
              background: '#74a7fe',
              height: 24,
              width: `${Math.round((d.value / maxValue) * 320)}px`,
              borderRadius: 6
            }} title={d.value.toString()}/>
            <span style={{ fontWeight: 600 }}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AnalyticsChart;
