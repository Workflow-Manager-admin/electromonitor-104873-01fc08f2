import React, { useState } from 'react';

// PUBLIC_INTERFACE
function UsageForm({ onSubmit }) {
  const [customerId, setCustomerId] = useState('');
  const [units, setUnits] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      customer_id: customerId,
      units: Number(units),
      date
    });
    setCustomerId('');
    setUnits('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', padding: 16, marginBottom: 30 }}>
      <input
        type="text"
        placeholder="Customer ID"
        value={customerId}
        style={{ flex: 2, minWidth: 120 }}
        onChange={e => setCustomerId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Units"
        min={1}
        value={units}
        style={{ flex: 1, minWidth: 80 }}
        onChange={e => setUnits(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        style={{ flex: 2, minWidth: 120 }}
        onChange={e => setDate(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-large" style={{ flex: 0.7, minWidth: 96, marginLeft: 16 }}>Add Usage</button>
    </form>
  );
}

export default UsageForm;
