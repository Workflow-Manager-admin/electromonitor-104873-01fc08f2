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
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        flexWrap: "wrap",
        padding: 22,
        marginBottom: 30,
        justifyContent: "space-between",
        background: "linear-gradient(90deg, #fff 80%, #f3f7ff 120%)"
      }}
    >
      <input
        type="text"
        placeholder="Customer ID"
        value={customerId}
        style={{ flex: 2, minWidth: 110, background: "var(--input-bg)", borderColor: "var(--outline)" }}
        onChange={e => setCustomerId(e.target.value)}
        required
        autoFocus
      />
      <input
        type="number"
        placeholder="Units"
        min={1}
        value={units}
        style={{ flex: 1, minWidth: 82, background: "var(--input-bg)" }}
        onChange={e => setUnits(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        style={{ flex: 2, minWidth: 110, background: "var(--input-bg)" }}
        onChange={e => setDate(e.target.value)}
        required
      />
      <button
        type="submit"
        className="btn btn-large"
        style={{
          flex: 0.79,
          minWidth: 96,
          marginLeft: 12,
          letterSpacing: "0.01em",
        }}
      >
        Add Usage
      </button>
    </form>
  );
}

export default UsageForm;
