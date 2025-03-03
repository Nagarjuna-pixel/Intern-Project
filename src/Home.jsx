import React, { useState, useEffect, useRef } from "react";
import Navbar from "../src/Navbar";
import "./styles.css";
import Calendar from "./Calendars.jsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from '@mui/material';
import { blueGrey } from "@mui/material/colors";


const Home = () => {

  const [userData, setUserData] = useState(null);
  const [setImageUrl] = useState("");
    const [userId] = useState(sessionStorage.getItem("userId"));

  const [ setIsTrainingDropdownOpen] = useState(false);
  const [ setIsLeaveDropdownOpen] = useState(false);
  const [setIsResignationDropdownOpen] = useState(false);

  const leaveDropdownRef = useRef(null);
  const trainingDropdownRef = useRef(null);
  const resignationDropdownRef = useRef(null);

  useEffect(() => {
    // **Step 1: Fetch logged-in user details from API**
    fetch("http://192.168.90.106:3012/api/hr/personaldetails?ADM=208010")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.ADM) {
          setUserData(data);
          
          // **Step 2: Fetch user image dynamically**
          setImageUrl(`http://192.168.90.106:3012/api/hr/image?ADM=${data.ADM}`);
        } else {
          console.error("Invalid response: Missing employee ID (ADM)");
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, );

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
        <CardMedia className="profile-image" component="img"  image= {`http://192.168.90.106:3012/api/hr/image?ADM=${userId}`}// Fallback if image fails
          alt="Profile"  />
        <CardContent style={{marginBottom:"600px"}}>
          <Typography variant="h5" component="div" align="center">
            User Profile
          </Typography>
          <span>{userData?.name || "NAME"}</span><br />
          <span>{userData?.ADM || "EMPLOYEE ID"}</span><br />
          <span>{userData?.designation || "DESIGNATION"}</span>
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

