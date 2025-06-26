import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import api from '../api'; // ✅ Axios instance

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('http://127.0.0.1:8000/api/auth/login/', {
        username: email,
        password: password,
      });

      const token = response.data.access;
      localStorage.setItem('accessToken', token); // ✅ Store token

      if (role === 'admin') navigate('/admin');
      else if (role === 'recycler') navigate('/recycler');
      else navigate('/user');

    } catch (error) {
      console.error(error);
      alert("Invalid credentials or server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input type="text" placeholder="Username" required onChange={(e) => setEmail(e.target.value)} />
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
