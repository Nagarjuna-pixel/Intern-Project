import { useState, useEffect, useMemo } from "react";
import * as React from "react";
import "./AdminDashboard.css";
import Dashboardsidebar from "./Dashboard_sidebar.jsx";
import AdminNavbar from "./AdminNavbar.jsx";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Grid,
  FormLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function AdminPosttraining() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: { default: "#121212", paper: "#1e1e1e" },
      text: { primary: "#ffffff" },
    },
  });

  const [designation, setDesignation] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [allDepartments, setAllDepartments] = useState([]); // Stores all department data
  const [value, setValue] = useState(dayjs("2022-04-17T15:30"));

  // Mapping designation names to EPDMBB_DESG_GROUP numbers
  const designationGroups = useMemo(
    () => ({
      admin: "4",
      teaching: "1",
      nursing: "3",
      technician: "2",
      "class industrial visit employees": "5",
    }),
    []
  );

  // Fetch department data from API when component loads
  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        const response = await fetch("http://localhost:5000/designations"); // Adjust API URL
        const data = await response.json();
        console.log("Fetched Departments:", data); // Debugging API response
        setAllDepartments(data); // Store all department data
      } catch (error) {
        console.error("Error fetching departments:", error);
        setAllDepartments([]);
      }
    };

    fetchAllDepartments();
  }, []);

  // Update department dropdown when designation is selected
  useEffect(() => {
    if (designation) {
      const groupNumber = designationGroups[designation]; // Get the corresponding EPDMBB_DESG_GROUP
      console.log(`Filtering departments for ${designation} (Group: ${groupNumber})`);

      // Filter departments where EPDMBB_DESG_GROUP matches the selected designation's group
      const matchingDepartments = allDepartments.filter(
        (dept) => String(dept.EPDMBB_DESG_GROUP) === groupNumber
      );

      console.log(`Filtered Departments for ${designation}:`, matchingDepartments);
      setFilteredDepartments(matchingDepartments);
    } else {
      setFilteredDepartments([]); // Reset department list if no designation is selected
    }
  }, [designation, allDepartments, designationGroups]);

  return (
    <>
      <Dashboardsidebar />
      <AdminNavbar />
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "120px",
            paddingLeft: "250px",
          }}
        >
          <div
            style={{
              backgroundColor: "#1e1e1e",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              width: "50%",
              textAlign: "center",
            }}
          >
            <h1 style={{ color: "#ec2e2e" }}>Post Training Program</h1>
            <br />
            <form>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormLabel>Session No</FormLabel>
                  <OutlinedInput
                    name="sessionNo"
                    placeholder="Session No"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel>Topic Name</FormLabel>
                  <OutlinedInput
                    name="topicName"
                    placeholder="Enter Topic Name"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormLabel>Designation</FormLabel>
                  <Select
                    name="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="">Select Designation Type</MenuItem>
                    {Object.keys(designationGroups).map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                {/* Show department dropdown only if a designation is selected */}
                {designation && (
                  <Grid item xs={12} md={6}>
                    <FormLabel>{designation} Department</FormLabel>
                    <Select
                      name="department"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="">Select Department</MenuItem>
                      {filteredDepartments.length > 0 ? (
                        filteredDepartments.map((item, index) => (
                          <MenuItem key={index} value={item.EPDMBB_DESG_LNAME}>
                            {item.EPDMBB_DESG_LNAME}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No Departments Available</MenuItem>
                      )}
                    </Select>
                  </Grid>
                )}
              </Grid>
              <br />
              <br />
              <Grid item xs={12} md={6} style={{ marginLeft: "-400px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    fullWidth
                  />
                </LocalizationProvider>
              </Grid>
              <Grid style={{marginLeft:"360px", marginTop:"-80px" , width:"300px"}}>
                   <FormLabel>Venue</FormLabel>
                   <Select name="venue" fullWidth>
                     <MenuItem value="">Select Venue</MenuItem>
                    <MenuItem value="Hall A">Hall A</MenuItem>
                    <MenuItem value="Conference Room">Conference Room</MenuItem>
                    <MenuItem value="Auditorium">Auditorium</MenuItem>
                   </Select>
                </Grid><br />
                <Grid style={{width:"300px"}}>
                   <FormLabel>Date</FormLabel>
                   <OutlinedInput type="date" name="date" fullWidth />
                </Grid>

              <br /><br />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default AdminPosttraining;


