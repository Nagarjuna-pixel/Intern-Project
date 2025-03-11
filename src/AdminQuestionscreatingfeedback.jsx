import { useState, } from 'react';
import * as React from 'react';
import AdminNavbar from "../src/AdminNavbar";
import Dashboard from "./Dashboard_sidebar";
import {Grid,FormLabel,OutlinedInput,Select,MenuItem,Button,styled,ThemeProvider,createTheme,Checkbox,ListItemText } from "@mui/material";
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
  justifyContent: "flex-center",
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


const AdminQuestionscreatingfeedback = () => {
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
   const [designation, setDesignation] = useState("");
    const [selectedDepartments, setSelectedDepartments] = useState([]);
     const [menuOpen, setMenuOpen] = useState(false);

  const handlePostClick = () => {
    navigate('/Admintrainingfeedbackhistory'); // This will navigate to the /admin-posttraining route
  };

  const handletrainingfeedbackChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  const departments = {
    Admin: ["Select Department Type", "Select All", "HR", "Finance", "Operations"],
    Teaching: ["Select Department Type", "Select All", "Cardiology", "Neurology", "Pediatrics"],
    Nursing: ["Select Department Type", "Select All", "ICU", "General Ward", "Pediatrics"],
    Technical: ["Select Department Type", "Select All", "IT Support", "Biomedical", "Maintenance"],
    Technician: ["Select Department Type", "Select All", "Lab Technician", "Radiology", "Pharmacy"],
  };

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
    setSelectedDepartments([]);
  };

 
  const handleDepartmentChange = (event) => {
    const value = event.target.value;

    if (value.includes("Select Department Type")) {
      setSelectedDepartments([]); // Clear selection
    } else if (value.includes("Select All")) {
      setSelectedDepartments(["All Departments"]); // Show "All Departments" in the box
      setMenuOpen(false); // Close menu
    } else {
      setSelectedDepartments(value);
      setMenuOpen(true);
    }
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
          <h1 style={{ color: "#ec2e2e" }}>Training Feedback</h1>
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
                                <FormLabel>Training Type</FormLabel>
                                <Select name="trainingtype" fullWidth>
                                  <MenuItem value="">Select Training Type</MenuItem>
                                  <MenuItem value="Induction Program">Induction Program</MenuItem>
                                 <MenuItem value="On Job Training">On Job Training</MenuItem>
                                  <MenuItem value="Customized/Softskills Training">Customized/Softskills Training</MenuItem>
                                </Select>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                                <FormLabel>Designation</FormLabel>
                                                <Select name="designation" value={designation} onChange={handleDesignationChange} fullWidth>
                                                  <MenuItem value="">Select Designation Type</MenuItem>
                                                  {Object.keys(departments).map((key) => (
                                                    <MenuItem key={key} value={key}>{key}</MenuItem>
                                                  ))}
                                                </Select>
                                              </Grid><br></br><br />
                                              {designation && (
                                                <Grid item xs={12} md={6}>
                                                  <FormLabel>{designation} Department</FormLabel>
                                                  <Select
                                                    multiple
                                                    name="department"
                                                    value={selectedDepartments}
                                                    onChange={handleDepartmentChange}
                                                    renderValue={(selected) => selected.includes("All Departments") ? "All Departments" : selected.join(", ")}
                                                    fullWidth
                                                    open={menuOpen}
                                                    onClose={() => setMenuOpen(false)}
                                                    onOpen={() => setMenuOpen(true)}
                                                    MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
                                                  >
                                                    {departments[designation].map((dept, index) => (
                                                      <MenuItem key={index} value={dept}>
                                                        <Checkbox checked={selectedDepartments.includes(dept) || selectedDepartments.includes("All  Departments")} />
                                                        <ListItemText primary={dept} />
                                                      </MenuItem>
                                                    ))}
                                                  </Select>
                                                </Grid>
                                              )}
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
                <FormLabel>Feedback</FormLabel>
                <OutlinedInput
                  name="feedback"
                  placeholder="Enter Feedback"
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

export default AdminQuestionscreatingfeedback;
