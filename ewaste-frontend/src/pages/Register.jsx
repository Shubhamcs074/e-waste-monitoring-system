import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Optional styling

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // In real app, send to backend API
    // axios.post('/api/register', { name, email, password, role })

    alert("Registered successfully!");
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" required onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="recycler">Recycler</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
