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
// import CardActionArea from '@mui/material/CardActionArea';
// import Box from '@mui/material/Box';


const Home = () => {
  const [ setIsTrainingDropdownOpen] = useState(false);
  const [ setIsLeaveDropdownOpen] = useState(false);
  const [setIsResignationDropdownOpen] = useState(false);

const [userId] = useState(sessionStorage.getItem("userId"));
  const [userName] = useState(sessionStorage.getItem("userName"));


  const leaveDropdownRef = useRef(null);
  const trainingDropdownRef = useRef(null);
  const resignationDropdownRef = useRef(null);

  // const [selectedCard, setSelectedCard] = React.useState(null);
  // const cards = [
  //   {
  //     id: 1,
  //     name: 'John Doe', // Replace with dynamic data if needed
  //     employeeId: 'EMP1234',
  //     designation: 'Software Engineer',
  //     image: profile, // Profile image
  //   },
  // ];

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
          <span style={{marginLeft:"120px"}}> NAME&nbsp;:&nbsp;{userName}</span><br></br>
        <span style={{marginLeft:"120px"}}>EMPLOYEEID&nbsp;:&nbsp;{userId}</span><br></br>
        <span style={{marginLeft:"120px"}}>DESIGNATION&nbsp;:&nbsp;</span>
        </CardContent>
      </Card>
       

      <div className="content">
        <Calendar />
      </div>
    </div>
  );
};

export default Home;

