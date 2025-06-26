import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import RecyclerDashboard from './pages/RecyclerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Awareness from './pages/Awareness';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminRecyclerAssign from './pages/AdminRecyclerAssign'; // Create this file or remove the route

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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/assign-recycler" element={<AdminRecyclerAssign />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

        {/* Awareness Page */}
        <Route path="/awareness" element={<Awareness />} />
      </Routes>
    </Router>
  );
}

export default App;
