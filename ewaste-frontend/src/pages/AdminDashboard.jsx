// src/pages/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './userDashboard.css';


function AdminDashboard() {
  const [pickupRequests, setPickupRequests] = useState([]);
  const [recyclers, setRecyclers] = useState([]);
  const [selectedRecycler, setSelectedRecycler] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUnassignedRequests();
    fetchRecyclers();
  }, []);

  const fetchUnassignedRequests = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/admin/unassigned-requests/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setPickupRequests(res.data);
    } catch (err) {
      console.error('Error fetching requests', err);
    }
  };

  const fetchRecyclers = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/admin/recyclers/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setRecyclers(res.data);
    } catch (err) {
      console.error('Error fetching recyclers', err);
    }
  };

  const handleAssign = async (requestId) => {
    const recyclerId = selectedRecycler[requestId];
    if (!recyclerId) {
      alert("Please select a recycler before assigning.");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/admin/assign-recycler/', {
        request_id: requestId,
        recycler_id: recyclerId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      setMessage('✅ Recycler assigned successfully!');
      fetchUnassignedRequests(); // refresh
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to assign recycler.');
    }
  };

  return (
    <><Header role="admin" />
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">📋 Unassigned Pickup Requests</h2>

      {message && <p className="mb-4 text-green-400">{message}</p>}

      <table className="mx-auto border-collapse border w-4/5 rounded shadow text-white">
        <thead className="bg-gray-800 text-cyan-300">
          <tr>
            <th className="border px-4 py-2">Device</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Assign Recycler</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {pickupRequests.map(req => (
            <tr key={req.id} className="border-b">
              <td className="border px-4 py-2">{req.device_name}</td>
              <td className="border px-4 py-2">{req.pickup_location}</td>
              <td className="border px-4 py-2">
                <select
                  className="border px-2 py-1 text-black"
                  onChange={(e) =>
                    setSelectedRecycler(prev => ({
                      ...prev,
                      [req.id]: e.target.value
                    }))
                  }
                  defaultValue=""
                >
                  <option value="" disabled>Select Recycler</option>
                  {recyclers.map(r => (
                    <option key={r.id} value={r.id}>{r.username}</option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  onClick={() => handleAssign(req.id)}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default AdminDashboard;
