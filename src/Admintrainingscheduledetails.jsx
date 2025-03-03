import React, {useState, useEffect} from "react";
import Dashboard from "./Dashboard_sidebar";
import AdminNavbar from "./AdminNavbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from '@mui/material';
import { blueGrey } from "@mui/material/colors";
// import { useNavigate } from 'react-router-dom';
 
function Admintrainingscheduledetails() {

    // const navigate = useNavigate(); // Initialize the navigate function
  
    // Function to handle button click and navigate to AdminPosttraining
    // const handlePostClick = () => {
    //   navigate('/AdminPosttraining'); // This will navigate to the /admin-posttraining route
    // };

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
      // Get the current month and year
      const date = new Date();
      const options = { year: 'numeric', month: 'long' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      
      // Set the formatted date as the state
      setCurrentDate(formattedDate);
    }, []);
  
    return (
      <>
        <Dashboard />
        <AdminNavbar/>
        <h1 style={{marginLeft:"300px",marginTop:"130px"}}>{currentDate}</h1>
        <Card className="training-card" style={{ backgroundColor: blueGrey[500], color: "white", marginLeft:"700px", marginTop:"50px", height:"400px", width : "600px" }}> 
        <CardMedia />
        <CardContent style={{marginBottom:"600px"}}>
          <Typography variant="h5" component="div" align="center">
            Training Details
          </Typography>
         <br></br><br></br>
         <Typography variant="h5" component="div" style={{marginRight:"400px"}} >
           Topic : 
          </Typography><br></br><br></br>
          <Typography variant="h5" component="div" style={{marginRight:"400px"}} >
           Trainer :
          </Typography><br></br><br></br>
          <Typography variant="h5" component="div" style={{marginRight:"400px"}} >
           Venue :
          </Typography><br></br><br></br>
          <Typography variant="h5" component="div" style={{marginRight:"400px"}} >
           Time :
          </Typography><br></br><br></br>
          
        </CardContent>
      </Card>
      </>
    );
  }
  
  export default Admintrainingscheduledetails;
  