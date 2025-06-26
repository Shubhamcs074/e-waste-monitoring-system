import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './userDashboard.css';

function AdminAnalytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/admin/stats/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  if (!stats) return <div className="p-10 text-center text-gray-600">Loading analytics...</div>;

  return (
    <>
    <Header role="admin" />
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6 text-center">📊 Admin Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card title="Total Users" value={stats.total_users} />
        <Card title="Total Recyclers" value={stats.total_recyclers} />
        <Card title="Total Requests" value={stats.total_requests} />
        <Card title="Pending Requests" value={stats.pending_requests} />
        <Card title="Assigned Requests" value={stats.assigned_requests} />
        <Card title="Completed Requests" value={stats.completed_requests} />
      </div>
    </div>
    </>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-2xl text-blue-600 font-bold">{value}</p>
    </div>
   
  );
}

export default AdminAnalytics;
