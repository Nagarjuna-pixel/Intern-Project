import { useState, } from 'react';
import * as React from 'react';
import Navbar from "../src/Navbar";
import {Grid,FormLabel,OutlinedInput,Select,MenuItem,Button,styled,ThemeProvider,createTheme,} from "@mui/material";
import "./ApplyLeave.css";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff" },
  },
});

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "100vh",
  paddingTop: "100px",
});

const FormBox = styled("div")({
  backgroundColor: "#1e1e1e",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  width: "50%",
  textAlign: "center",
});

const TrainingFeedback = () => {
  const navigate = useNavigate();
  const [leaveForm, setLeaveForm] = useState({
    name: "",
    employeeId: "",
    trainername:"",
    trainerId : "",
    trainingtype: "",
    date: "",
    reason: "",
  });

  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));

  const handlePostClick = () => {
    navigate('/usertrainingfeedbackhistory'); // This will navigate to the /admin-posttraining route
  };

  const handletrainingfeedbackChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(leaveForm);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
      <FormContainer>
        <FormBox>
          <h1 style={{ color: "#ec2e2e" }}>Training Feedback</h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              
              <Grid item xs={12} md={6}>
                <FormLabel>Employee ID</FormLabel>
                <OutlinedInput
                  name="employeeId"
                  placeholder="Enter Employee ID"
                  fullWidth
                  size="small"
                  onChange={handletrainingfeedbackChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Trainer Name</FormLabel>
                <OutlinedInput
                  name="trainername"
                  placeholder="Enter Trainer Name"
                  fullWidth
                  size="small"
                  onChange={handletrainingfeedbackChange}
                />
              </Grid>
             <Grid item xs={12} md={6}>
                                           <FormLabel>Training Type</FormLabel>
                                           <Select
                                               name="trainingtype"
                                               value={leaveForm.leaveType}
                                               onChange={handletrainingfeedbackChange}
                                               fullWidth
                                           >
                                               <MenuItem value="">Select Leave Type</MenuItem>
                                               <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                                               <MenuItem value="Earned Leave">Earned Leave</MenuItem>
                                               <MenuItem value="Medical Leave">Medical Leave</MenuItem>
                                               <MenuItem value="On Duty Leave">On Duty Leave</MenuItem>
                                           </Select>
                                       </Grid>
                                       <Grid item xs={6} md={6}>
                                           <FormLabel>Date</FormLabel>
                                           <OutlinedInput
                                               type="date"
                                               name="date"
                                               fullWidth
                                               onChange={handletrainingfeedbackChange} />
                                       </Grid>
                                       <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['TimePicker']}>
      <TimePicker
        label="Time"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        fullWidth // Ensures it takes the full width available
      />
    </DemoContainer>
  </LocalizationProvider>
</Grid>
              <Grid item xs={12}>
                <FormLabel>Reason</FormLabel>
                <OutlinedInput
                  name="reason"
                  placeholder="Enter Reason"
                  fullWidth
                  multiline
                  rows={3}
                  onChange={handletrainingfeedbackChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" size="large">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormBox>
      </FormContainer>
        <Button variant="contained" className="fixed-button" style={{marginTop:"-800px"}}  onClick={handlePostClick} >Feedback History</Button> 
    </ThemeProvider>
      
  );
};

export default TrainingFeedback;
