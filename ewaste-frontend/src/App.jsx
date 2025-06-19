import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RecyclerDashboard from './pages/RecyclerDashboard';
import Awareness from './pages/Awareness';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/recycler" element={<RecyclerDashboard />} />
        <Route path="/awareness" element={<Awareness />} />
      </Routes>
    </Router>
  );
}

export default App;
