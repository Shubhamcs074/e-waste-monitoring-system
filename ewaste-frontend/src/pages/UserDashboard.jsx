import React, { useState } from 'react';
import DeviceForm from '../components/DeviceForm';
import RequestForm from '../components/RequestForm';
import Header from '../components/Header';
import './userDashboard.css';

const UserDashboard = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Dell Laptop', status: 'active' },
    { id: 2, name: 'Old Printer', status: 'obsolete' }
  ]);

  return (
    <>
      {/* Navbar/Header at the top */}
      
      <Header role="user" />
      

      {/* Main dashboard content */}
      <div className="dashboard-container">
        <h2><i className="fas fa-user-circle"></i> User Dashboard</h2>


        <section>
          <h3>📋 Your Devices</h3>
          <ul>
          {devices.map((device) => (
         <li key={device.id} className="device-item">
        <span>
          {device.name}
            {" - "}
           <span className={`device-status ${device.status}`}>{device.status}</span>
          </span>
           {device.status === 'obsolete' && (
           <RequestForm deviceId={device.id} />
         )}
       </li>
     ))}
    </ul>

        </section>

        <hr />

        <section>
          <h3>➕ Add New Device</h3>
          <DeviceForm setDevices={setDevices} />
        </section>
      </div>
    </>
  );
};

export default UserDashboard;