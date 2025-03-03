import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../src/Navbar";
import "./styles.css";
import Calendar from "./Calendars.jsx";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Training = () => {
  const navigate = useNavigate();
  
  const [showFullContent, setShowFullContent] = useState(false);

  return (
    <div className="app-container">
      <Navbar />
    
      {/* Sidebar card with expandable content */}
      <Card className="profile-training-card" style={{ backgroundColor: blueGrey[500], color: "black", overflow: "hidden" }}> 
        <CardContent>
          <Typography variant="h5" component="div" align="center">
            Training Completed
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: "30px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Training Name</strong></TableCell>
                  <TableCell><strong>Completed Date</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>React Basics</TableCell>
                  <TableCell>2024-02-10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Advanced JavaScript</TableCell>
                  <TableCell>2024-02-12</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button onClick={() => setShowFullContent(!showFullContent)}>
            {showFullContent ? "Show Less" : "Show More"}
          </Button>
        </CardActions>
      </Card>
      {/* Main content */}
      <div className="content">
      <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/TrainingFeedback")}
          style={{marginLeft:"1200px"}}
        >
          Training Feedback
        </Button>
        <Calendar />
        {/* <div className="feedback-button-container" style={{ textAlign: "center", marginTop: "50px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("./Training_Feedback.jsx")}
        >
          Training Feedback
        </Button>
      </div> */}
      </div>
    </div>
  );
};

export default Training;
