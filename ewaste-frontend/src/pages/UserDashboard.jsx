import React, { useEffect, useState } from 'react';
import api from '../api';
import Header from '../components/Header';
import './userDashboard.css';

const UserDashboard = () => {
  const [devices, setDevices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ name: '', location: '',status: 'active' });
  const [pickupForm, setPickupForm] = useState({ device: '', pickup_date: '' });

  // Fetch Devices
  const fetchDevices = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.get('/user/devices/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  // Fetch Pickup Requests
  const fetchPickupRequests = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.get('/user/requests/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching pickup requests:', error);
    }
  };

  // Register Device
  const registerDevice = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await api.post('/user/devices/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Device registered!');
      setFormData({ name: '', location: '' });
      fetchDevices();
    } catch (error) {
      console.error('Error registering device:', error);
      alert('Failed to register device');
    }
  };

  // Create Pickup Request
  const createPickupRequest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      await api.post('/user/requests/', pickupForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Pickup request submitted!');
      setPickupForm({ device: '', pickup_date: '' });
      fetchPickupRequests();
    } catch (error) {
      console.error('Error creating pickup request:', error);
      alert('Failed to create request');
    }
  };

  useEffect(() => {
    fetchDevices();
    fetchPickupRequests();
  }, []);

  return (
    <>
      <Header role="user" />
      <div className="dashboard-container">
        <h2>📱 My Devices</h2>

        {devices.length === 0 ? (
          <p>No devices registered yet.</p>
        ) : (
          <ul>
            {devices.map((device) => (
              <li key={device.id}>
                <strong>{device.name}</strong> — 
                <span className={`status-badge status-${device.status}`}>{device.status}</span> — 
                {device.location}
              </li>
            ))}
          </ul>
        )}

        <hr />
        <h3>➕ Register New Device</h3>
        <form onSubmit={registerDevice}>
  <input
    type="text"
    placeholder="Device Name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    required
  />
  <input
    type="text"
    placeholder="Location"
    value={formData.location}
    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
    required
  />
  <select
    value={formData.status}
    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
    required
  >
    <option value="active">Active</option>
    <option value="obsolete">Obsolete</option>
  </select>
  <button type="submit">Register Device</button>
</form>


        <hr />
        <h3>📦 Pickup Requests</h3>
        {requests.length === 0 ? (
          <p>No pickup requests yet.</p>
        ) : (
          <table className="pickup-table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.device_name}</td>
                  <td>
  {req.pickup_date ? new Date(req.pickup_date).toLocaleDateString() : 'Not Set'}
</td>

                  <td>
                    <span className={`status-badge status-${req.status}`}>{req.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <hr />
        <h3>📝 Create Pickup Request</h3>
        <form onSubmit={createPickupRequest}>
          <select
            value={pickupForm.device}
            onChange={(e) => setPickupForm({ ...pickupForm, device: e.target.value })}
            required
          >
            <option value="">Select Device</option>
            {devices
              .filter((d) => d.status === 'obsolete')
              .map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name}
                </option>
              ))}
          </select>
          <input
            type="date"
            value={pickupForm.pickup_date}
            onChange={(e) => setPickupForm({ ...pickupForm, pickup_date: e.target.value })}
            required
          />
          <button type="submit">Request Pickup</button>
        </form>
      </div>
    </>
  );
};

export default UserDashboard;
