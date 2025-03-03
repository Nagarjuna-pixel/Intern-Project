import React, { useState} from "react";
import AdminNavbar from "./AdminNavbar.jsx";
import DashboardSidebar from "./Dashboard_sidebar.jsx";
import {
  Grid,
  FormLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  styled,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import "./ApplyLeave.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff" },
  },
});

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "row", // Display items side by side
  justifyContent: "center",
  alignItems: "flex-start",
  height: "100vh",
  paddingTop: "100px", // Gap from navbar
  gap: "40px", // Space between card and form
  marginLeft:"300px",
});


const FormBox = styled("div")({
  backgroundColor: "#1e1e1e",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  width: "50%",
  textAlign: "center",
});

const ApplyResignation = () => {
  const [resignationForm, setResignForm] = useState({
    name: "",
    employeeId: "",
    designation: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleResignInputChange = (e) => {
    const { name, value } = e.target;
    setResignForm({ ...resignationForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(resignationForm);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AdminNavbar />
      <DashboardSidebar/>
      <PageContainer>
        <FormBox>
          <h1 style={{ color: "#ec2e2e" }}>Resignation Form</h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormLabel>Name</FormLabel>
                <OutlinedInput
                  name="name"
                  placeholder="Enter Name"
                  fullWidth
                  size="small"
                  onChange={handleResignInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Employee ID</FormLabel>
                <OutlinedInput
                  name="employeeId"
                  placeholder="Enter Employee ID"
                  fullWidth
                  size="small"
                  onChange={handleResignInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Designation</FormLabel>
                <OutlinedInput
                  name="designation"
                  placeholder="Enter Designation"
                  fullWidth
                  size="small"
                  onChange={handleResignInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Email ID</FormLabel>
                <OutlinedInput
                  name="email"
                  placeholder="Enter Email ID"
                  fullWidth
                  size="small"
                  onChange={handleResignInputChange}
                />
              </Grid>
              {/* <Grid><FormLabel>Notice Period</FormLabel></Grid> */}
              <Grid item xs={6} md={6}>
                <FormLabel>From Date</FormLabel>
                <OutlinedInput
                  type="date"
                  name="fromDate"
                  fullWidth
                  onChange={handleResignInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Session</FormLabel>
                <Select
                  name="leaveType"
                  value={resignationForm.leaveType}
                  onChange={handleResignInputChange}
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
                  onChange={handleResignInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel>Session</FormLabel>
                <Select
                  name="leaveType"
                  value={resignationForm.leaveType}
                  onChange={handleResignInputChange}
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
                  onChange={handleResignInputChange}
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
      </PageContainer>
    </ThemeProvider>
  );
};

export default ApplyResignation;
