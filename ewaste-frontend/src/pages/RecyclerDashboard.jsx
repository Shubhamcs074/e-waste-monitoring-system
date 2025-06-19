import React, { useState } from 'react';

const RecyclerDashboard = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      deviceName: 'Old Laptop',
      status: 'Pending',
      pickupLocation: 'Jaipur'
    },
    {
      id: 2,
      deviceName: 'Broken Projector',
      status: 'Collected',
      pickupLocation: 'Kota'
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <div className="dashboard-container">
      <h2>🚛 Recycler Dashboard</h2>
      <ul>
        {requests.map(req => (
          <li key={req.id} style={{ marginBottom: '15px' }}>
            <strong>{req.deviceName}</strong> — {req.status} <br />
            Location: {req.pickupLocation} <br />
            {req.status !== 'Recycled' && (
              <select
                value={req.status}
                onChange={(e) => handleStatusChange(req.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Collected">Collected</option>
                <option value="Recycled">Recycled</option>
              </select>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecyclerDashboard;
