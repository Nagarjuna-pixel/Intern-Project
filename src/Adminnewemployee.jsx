import { useState, } from 'react';
import * as React from 'react';
import AdminNavbar from "../src/AdminNavbar";
import Dashboard from "./Dashboard_sidebar";
import {Grid,FormLabel,OutlinedInput,Button,Select,MenuItem,styled,ThemeProvider,createTheme,} from "@mui/material";
import "./ApplyLeave.css";
// import { useNavigate } from "react-router-dom";

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
  justifyContent: "flex-center",
  height: "100vh",
  paddingTop: "100px",
  marginLeft : "250px",
});

const FormBox = styled("div")({
  backgroundColor: "#1e1e1e",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  width: "50%",
  textAlign: "center",
});

const Adminnewemployee = () => {
//   const navigate = useNavigate();
  const [leaveForm, setLeaveForm] = useState({
    name: "",
    employeeId: "",
    trainername:"",
    trainerId : "",
    trainingtype: "",
    date: "",
    reason: "",
  });



//   const handlePostClick = () => {
//     navigate('/Admintrainingfeedbackhistory'); // This will navigate to the /admin-posttraining route
//   };

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
      <Dashboard/>
      <AdminNavbar />
      <FormContainer>
        <FormBox>
          <h1 style={{ color: "#ec2e2e" }}>New Employee</h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormLabel>Name</FormLabel>
                <OutlinedInput
                  name="name"
                  placeholder="Enter Name"
                  fullWidth
                  size="small"
                  onChange={handletrainingfeedbackChange}
                />
              </Grid>
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
                <FormLabel>Department</FormLabel>
                <OutlinedInput
                  name="tdepartment"
                  placeholder="Enter Department"
                  fullWidth
                  size="small"
                  onChange={handletrainingfeedbackChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Email ID</FormLabel>
                <OutlinedInput
                  name="emailid"
                  placeholder="Enter Mail ID"
                  fullWidth
                  size="small"
                  onChange={handletrainingfeedbackChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Position</FormLabel>
                <OutlinedInput
                  name="position"
                  placeholder="Enter Position"
                  fullWidth
                  size="small"
                  onChange={handletrainingfeedbackChange}
                />
              </Grid>
             <Grid item xs={6} md={6}>
                                           <FormLabel>Joining Date</FormLabel>
                                           <OutlinedInput
                                               type="date"
                                               name="joiningdate"
                                               fullWidth
                                               onChange={handletrainingfeedbackChange} />
                                       </Grid>
                                        <Grid item xs={12} md={6}>
                                                                                  <FormLabel>Schedule</FormLabel>
                                                                                  <Select
                                                                                      name="trainingtype"
                                                                                      value={leaveForm.leaveType}
                                                                                      onChange={handletrainingfeedbackChange}
                                                                                      fullWidth
                                                                                  >
                                                                                      <MenuItem value="">Select Schedule</MenuItem>
                                                                                      <MenuItem value="dayshift">Day Shift</MenuItem>
                                                                                      <MenuItem value="Nightshift">Night Shift</MenuItem>
                                                                                  </Select>
                                                                              </Grid>
                                                                              <Grid item xs={12} md={6}>
  <FormLabel>Photo</FormLabel>
  <OutlinedInput
    type="file"
    name="photo"
    fullWidth
    inputProps={{ accept: "image/*" }}
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
        {/* <Button variant="contained" className="fixed-button" style={{marginTop:"-800px"}}  onClick={handlePostClick} >Feedback History</Button>  */}
    </ThemeProvider>
      
  );
};

export default Adminnewemployee;
