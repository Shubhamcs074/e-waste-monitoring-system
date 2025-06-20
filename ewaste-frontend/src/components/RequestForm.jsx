import React, { useState } from 'react';

const RequestForm = ({ deviceId }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleRequest = () => {
    // Simulate request submission
    alert(`Collection request raised for device ID: ${deviceId}`);
    setSubmitted(true);
  };

  return (
    <button class="styleit" onClick={handleRequest} disabled={submitted}>
      {submitted ? "Requested" : "Raise Collection Request"}
    </button>
  );
};

export default RequestForm;
