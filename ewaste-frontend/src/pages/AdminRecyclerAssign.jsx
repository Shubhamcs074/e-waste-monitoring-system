import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './userDashboard.css';

const AdminRecyclerAssign = () => {
  const [requests, setRequests] = useState([]);
  const [recyclers, setRecyclers] = useState([]);
  const [selectedRecycler, setSelectedRecycler] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Get JWT token from localStorage
  const token = localStorage.getItem('accessToken');
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch all unassigned pickup requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get('/api/admin/unassigned-requests/', authHeader);
      setRequests(res.data);
    } catch (error) {
      console.error('Error fetching pickup requests:', error);
    }
  };

  // Fetch all available recyclers
  const fetchRecyclers = async () => {
    try {
      const res = await axios.get('/api/admin/recyclers/', authHeader);
      setRecyclers(res.data);
    } catch (error) {
      console.error('Error fetching recyclers:', error);
    }
  };

  // On mount
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    await fetchRequests();
    await fetchRecyclers();
    setLoading(false);
  };
  fetchData();
}, [fetchRequests, fetchRecyclers]);

  // Assign recycler to request
  const handleAssign = async (requestId) => {
    const recyclerId = selectedRecycler[requestId];
    if (!recyclerId) {
      alert('Please select a recycler');
      return;
    }

    try {
      const res = await axios.post(
        '/api/admin/assign-recycler/',
        {
          request_id: requestId,
          recycler_id: recyclerId,
        },
        authHeader
      );

      setMessage(res.data.success || 'Recycler assigned successfully!');
      fetchRequests(); // Refresh the list
      setSelectedRecycler((prev) => ({
        ...prev,
        [requestId]: '',
      }));
    } catch (error) {
      console.error('Error assigning recycler:', error);
      setMessage('Assignment failed.');
    }
  };

  return (<> 
    <Header role="admin" />
    <div style={{ padding: '20px' }}>
      <h2>🔄 Assign Recyclers to Pickup Requests</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {loading ? (
        <p>Loading data...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Device</th>
              <th>Address</th>
              <th>User</th>
              <th>Assign Recycler</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.device.name}</td>
                <td>{req.address}</td>
                <td>{req.user?.username || 'N/A'}</td>
                <td>
                  <select
                    value={selectedRecycler[req.id] || ''}
                    onChange={(e) =>
                      setSelectedRecycler((prev) => ({
                        ...prev,
                        [req.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">-- Select --</option>
                    {recyclers.map((recycler) => (
                      <option key={recycler.id} value={recycler.id}>
                        {recycler.name || recycler.username}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => handleAssign(req.id)}>Assign</button>
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

export default AdminRecyclerAssign;
