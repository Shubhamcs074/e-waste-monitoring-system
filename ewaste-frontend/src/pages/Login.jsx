import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Optional styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate role-based redirection
    if (role === 'admin') navigate('/admin');
    else if (role === 'recycler') navigate('/recycler');
    else navigate('/user');

    // In real app, call API with axios:
    // axios.post('/api/login', { email, password, role })
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="recycler">Recycler</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
