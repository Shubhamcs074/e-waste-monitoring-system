import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import RecyclerDashboard from './pages/RecyclerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Awareness from './pages/Awareness';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/recycler" element={<RecyclerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Awareness Page */}
        <Route path="/awareness" element={<Awareness />} />
      </Routes>
    </Router>
  );
}

export default App;
