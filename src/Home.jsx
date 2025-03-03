import React, { useState, useEffect, useRef } from "react";
import profile from "../src/profile-removebg-preview.png";
import Navbar from "../src/Navbar";
import "./styles.css";
import Calendar from "./Calendars.jsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from '@mui/material';
import { blueGrey } from "@mui/material/colors";


const Home = () => {
  const [ setIsTrainingDropdownOpen] = useState(false);
  const [ setIsLeaveDropdownOpen] = useState(false);
  const [setIsResignationDropdownOpen] = useState(false);

  const leaveDropdownRef = useRef(null);
  const trainingDropdownRef = useRef(null);
  const resignationDropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (leaveDropdownRef.current && !leaveDropdownRef.current.contains(event.target)) {
      setIsLeaveDropdownOpen(false);
    }
    if (trainingDropdownRef.current && !trainingDropdownRef.current.contains(event.target)) {
      setIsTrainingDropdownOpen(false);
    }
    if (resignationDropdownRef.current && !resignationDropdownRef.current.contains(event.target)) {
      setIsResignationDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="app-container">
      <Navbar />

      {/* Sidebar card */}
     
      <Card className="profile-card" style={{ backgroundColor: blueGrey[500], color: "white" }}> 
        <CardMedia className="profile-image" component="img" image={profile} alt="Profile"  />
        <CardContent style={{marginBottom:"600px"}}>
          <Typography variant="h5" component="div" align="center">
            User Profile
          </Typography>
          <span>NAME</span><br></br>
        <span>EMPLOYEE ID</span><br></br>
        <span>DESIGNATION</span>
        </CardContent>
      </Card>
      

      {/* Main content */}
      <div className="content">
        <Calendar />
      </div>
    </div>
  );
};

export default Home;

