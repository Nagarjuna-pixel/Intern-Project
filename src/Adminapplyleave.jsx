import React, { useState, useRef } from "react";
import AdminNavbar from "./AdminNavbar.jsx";
import Dashboard from "./Dashboard_sidebar.jsx";
import {Grid,FormLabel,OutlinedInput,Select,MenuItem,Button,styled,ThemeProvider,createTheme,} from "@mui/material";
import "./ApplyLeave.css";

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
  width : "200vh",
  height: "100vh",
  paddingTop: "100px",
  marginLeft:"150px",
});

const FormBox = styled("div")({
  backgroundColor: "#1e1e1e",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  width: "50%",
  textAlign: "center",
});

const HiddenInput = styled("input")({
  display: "none",
});

const AdminapplyLeave = () => {
  const [leaveForm, setLeaveForm] = useState({
    name: "",
    employeeId: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    sessionFrom: "",
    sessionTo: "",
    medicalCertificate: null,
  });

  const fileInputRef = useRef();

  const handleLeaveInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setLeaveForm({ ...leaveForm, medicalCertificate: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(leaveForm);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AdminNavbar />
      <Dashboard />
      <FormContainer>
        <FormBox>
          <h1 style={{ color: "#ec2e2e" }}>Leave Request Application</h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormLabel>Name</FormLabel>
                <OutlinedInput
                  name="name"
                  placeholder="Enter Name"
                  fullWidth
                  size="small"
                  onChange={handleLeaveInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Employee ID</FormLabel>
                <OutlinedInput
                  name="employeeId"
                  placeholder="Enter Employee ID"
                  fullWidth
                  size="small"
                  onChange={handleLeaveInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Leave Type</FormLabel>
                <Select
                  name="leaveType"
                  value={leaveForm.leaveType}
                  onChange={handleLeaveInputChange}
                  fullWidth
                >
                  <MenuItem value="">Select Leave Type</MenuItem>
                  <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                  <MenuItem value="Earned Leave">Earned Leave</MenuItem>
                  <MenuItem value="Medical Leave">Medical Leave</MenuItem>
                  <MenuItem value="On Duty Leave">On Duty Leave</MenuItem>
                </Select>
  
              </Grid>
              <Grid item xs={6}>
                <FormLabel>From Date</FormLabel>
                <OutlinedInput
                  type="date"
                  name="fromDate"
                  fullWidth
                  onChange={handleLeaveInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Session</FormLabel>
                <Select
                  name="sessionFrom"
                  value={leaveForm.sessionFrom}
                  onChange={handleLeaveInputChange}
                  fullWidth
                >
                  <MenuItem value="">Select Session</MenuItem>
                  <MenuItem value="Forenoon">Forenoon</MenuItem>
                  <MenuItem value="Afternoon">Afternoon</MenuItem>
                </Select>
               
              </Grid>
              <Grid item xs={6}>
                <FormLabel>To Date</FormLabel>
                <OutlinedInput
                  type="date"
                  name="toDate"
                  fullWidth
                  onChange={handleLeaveInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel>Session</FormLabel>
                <Select
                  name="sessionTo"
                  value={leaveForm.sessionTo}
                  onChange={handleLeaveInputChange}
                  fullWidth
                >
                  <MenuItem value="">Select Session</MenuItem>
                  <MenuItem value="Forenoon">Forenoon</MenuItem>
                  <MenuItem value="Afternoon">Afternoon</MenuItem>
                </Select>
               
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Reason</FormLabel>
                <OutlinedInput
                  name="reason"
                  placeholder="Enter Reason"
                  fullWidth
                  multiline
                  rows={3}
                  onChange={handleLeaveInputChange}
                />
              </Grid>
              {leaveForm.leaveType === "Medical Leave" && (
                <Grid item xs={12}>
                  <FormLabel>Upload Document</FormLabel>
                  <HiddenInput
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <Button variant="contained" onClick={() => fileInputRef.current.click()}>
                    {leaveForm.medicalCertificate ? "Replace File" : "Upload File"}
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" size="large">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormBox>
      </FormContainer>
    </ThemeProvider>
  );
};

export default AdminapplyLeave;
