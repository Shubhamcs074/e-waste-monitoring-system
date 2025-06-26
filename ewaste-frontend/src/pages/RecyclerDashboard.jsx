import React, { useEffect, useState } from 'react';
import api from '../api';
import Header from '../components/Header';
import './userDashboard.css'; // Reuse same styles

const RecyclerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch recycler's assigned requests
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.get('/recycler/assigned-requests/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching recycler requests:', error);
    }
  };

  // Update status of a request
  const updateStatus = async (id, status) => {
  try {
    const token = localStorage.getItem('accessToken');
    await api.post(`/recycler/update-status/`, {
      request_id: id,
      status: status
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchRequests(); // Refresh
  } catch (error) {
    console.error('Error updating request status:', error);
  }
};


  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <Header role="recycler" />
      <div className="dashboard-container">
        <h2>🔁 Assigned Pickup Requests</h2>

        {message && <p style={{ color: 'green', marginBottom: '1rem' }}>{message}</p>}

        {requests.length === 0 ? (
          <p>No requests assigned to you yet.</p>
        ) : (
          <table className="pickup-table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Location</th>
                <th>Pickup Date</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.device_name}</td>
                  <td>{req.device_location}</td>
                  <td>
                    {req.pickup_date
                      ? new Date(req.pickup_date).toLocaleDateString()
                      : 'Not Set'}
                  </td>
                  <td>
                    <span className={`status-badge ${req.status.toLowerCase()}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={req.status}
                      onChange={(e) => {
                        if (e.target.value !== req.status) {
                          updateStatus(req.id, e.target.value);
                        }
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In-Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default RecyclerDashboard;
