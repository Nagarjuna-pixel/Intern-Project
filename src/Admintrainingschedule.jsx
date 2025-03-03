import React from 'react';
import './AdminDashboard.css'; // Create a separate CSS file for styling
import Dashboard from './Dashboard_sidebar.jsx';
import Calendar from './Calendars.jsx';
import { useNavigate } from 'react-router-dom';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AdminNavbar from './AdminNavbar.jsx';


function Admintrainingschedule() {

  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle button click and navigate to AdminPosttraining
  const handlePostClick = () => {
    navigate('/AdminPosttraining'); // This will navigate to the /admin-posttraining route
  };

  return (
    <>
      <Dashboard />
      <AdminNavbar/>
      
      <div className="admincontent">
        <div className="calendar-container">
        <h1 style={{marginTop:"10px", marginLeft:"100px", color:"red"}}>Training Schedule</h1>
          <Calendar />
        </div>
      </div>
      <Button variant="contained" className="fixed-button"  onClick={handlePostClick} >+ Post</Button>
    </>
  );
}

export default Admintrainingschedule;
