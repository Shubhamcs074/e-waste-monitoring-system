import React, { useState } from 'react';
import api from '../api'; // ✅ Axios instance with base URL

const DeviceForm = ({ setDevices }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('active');

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.post('user/devices/', {
        name,
        status, // send status too if backend supports it
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Add the newly created device to the UI
      setDevices(prev => [...prev, response.data]);

      // Reset form
      setName('');
      setStatus('active');

    } catch (error) {
      console.error('Failed to add device:', error);
      alert('Failed to add device.');
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        type="text"
        placeholder="Device Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
  value={formData.status}
  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
  required
>
  <option value="active">Active</option>
  <option value="obsolete">Obsolete</option>
</select>
      <button type="submit">Add Device</button>
    </form>
  );
};

export default DeviceForm;
