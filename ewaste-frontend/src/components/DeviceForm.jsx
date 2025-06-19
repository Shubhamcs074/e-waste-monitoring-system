import React, { useState } from 'react';

const DeviceForm = ({ setDevices }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('active');

  const handleAdd = (e) => {
    e.preventDefault();
    const newDevice = { id: Date.now(), name, status };

    // Simulate adding to backend by updating state
    setDevices(prev => [...prev, newDevice]);

    // Reset form
    setName('');
    setStatus('active');
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
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="active">Active</option>
        <option value="obsolete">Obsolete</option>
      </select>
      <button type="submit">Add Device</button>
    </form>
  );
};

export default DeviceForm;
