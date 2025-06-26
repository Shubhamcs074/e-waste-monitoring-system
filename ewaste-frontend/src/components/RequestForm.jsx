import React from 'react';
import api from '../api';

const RequestForm = ({ deviceId }) => {
  const handleRequest = async () => {
  try {
    await api.post('/user/requests/', { device: deviceId });
    alert('Pickup requested!');
  } catch (error) {
    console.error("Pickup request failed:", error);
    alert('Failed to request pickup');
  }
};

  return <button onClick={handleRequest}>Request Pickup</button>;
};

export default RequestForm;
