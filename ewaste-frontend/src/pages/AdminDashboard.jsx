import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    users: 12,
    recyclers: 3,
    devices: 28,
    requests: 7
  });

  const [recyclers, setRecyclers] = useState([
    { id: 1, name: 'Green Recycle Co.', location: 'Jaipur', status: 'Approved' },
    { id: 2, name: 'EcoBin India', location: 'Udaipur', status: 'Approved' },
    { id: 3, name: 'New Collector', location: 'Delhi', status: 'Pending' }
  ]);

  const approveRecycler = (id) => {
    setRecyclers(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: 'Approved' } : r
      )
    );
  };

  return (
    <div className="dashboard-container">
      <h2>🛠️ Admin Dashboard</h2>

      <section>
        <h3>📊 Summary</h3>
        <ul>
          <li>Total Users: {summary.users}</li>
          <li>Total Devices: {summary.devices}</li>
          <li>Total Recyclers: {summary.recyclers}</li>
          <li>Total Requests: {summary.requests}</li>
        </ul>
      </section>

      <hr />

      <section>
        <h3>♻️ Recyclers</h3>
        <ul>
          {recyclers.map(r => (
            <li key={r.id}>
              {r.name} — {r.location} — <strong>{r.status}</strong>
              {r.status === 'Pending' && (
                <button onClick={() => approveRecycler(r.id)} style={{ marginLeft: '10px' }}>
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
