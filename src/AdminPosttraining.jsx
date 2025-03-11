import { useState, useEffect, useMemo } from "react";
import "./AdminDashboard.css";
import axios from "axios";
import Dashboardsidebar from "./Dashboard_sidebar.jsx";
import AdminNavbar from "./AdminNavbar.jsx";
import { 
  Grid, 
  FormLabel, 
  OutlinedInput, 
  Select, 
  MenuItem, 
  Button, 
  ThemeProvider, 
  createTheme, 
  Checkbox, 
  ListItemText 
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useNavigate } from "react-router-dom";

function AdminPosttraining() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: { default: "#121212", paper: "#1e1e1e" },
      text: { primary: "#ffffff" },
    },
  });

  // State variables
  const [designation, setDesignation] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [clickedCategoryDepartments, setClickedCategoryDepartments] = useState([]);
  const [designationDropdown, setDesignationDropdown] = useState([]);
  const [groupNo, setGroupNo] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [subdepartment, setSubDepartment] = useState([]);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectAllCategories, setSelectAllCategories] = useState(false);
  const [selectAllDepartments, setSelectAllDepartments] = useState(false);
  const [selectAllDesignations, setSelectAllDesignations] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    trainingSessionNo: "",
    topicName: "",
    category: "",
    department: "",
    designation: "",
    trainerName: "",
    trainingType: "",
    fromtime: "",
    totime: "",
    venue: "",
    trainingDate: "",
    participant: "", // Added new participant field
  });

  // Designation group mapping
  const designationGroups = useMemo(() => ({
    "ADMINISTRATIVE STAFF": "4",
    TEACHING: "1",
    NURSING: "3",
    TECHNICIAN: "2",
    "CLASS IV EMPLOYEES": "5",
  }), []);

  // Fetch Categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/Designations");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setAllCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setAllCategories([]);
        setSubmitStatus({
          message: "Failed to load categories. Please refresh the page.",
          type: "error"
        });
      }
    };
    fetchCategories();
  }, []);

  // Check if all categories/departments/designations are selected
  useEffect(() => {
    setSelectAllCategories(designation.length === Object.keys(designationGroups).length);
    setSelectAllDepartments(selectedDepartment.length === clickedCategoryDepartments.length && clickedCategoryDepartments.length > 0);
    setSelectAllDesignations(subdepartment.length === designationDropdown.length && designationDropdown.length > 0);
  }, [designation, selectedDepartment, subdepartment, clickedCategoryDepartments, designationDropdown, designationGroups]);

  // Handle Category Selection
  const handleCategoryClick = async (event) => {
    const value = event.target.value;

    if (value.includes("Select All")) {
      handleSelectAllCategories();
      return;
    }

    setDesignation(value);
    const groupNumbers = value.map(cat => designationGroups[cat]);
    setGroupNo(groupNumbers);

    // Reset departments and designations
    setSelectedDepartment([]);
    setSubDepartment([]);
    setDesignationDropdown([]);
    setSelectAllDepartments(false);
    setSelectAllDesignations(false);

    if (groupNumbers.length === 0) {
      setClickedCategoryDepartments([]);
      return;
    }

    try {
      setIsLoading(true);
      const deptPromises = groupNumbers.map(group => 
        fetch(`http://192.168.90.106:3012/api/hr/Deptlist?groupNo=${group}`).then(res => res.json())
      );
      const deptResults = await Promise.all(deptPromises);
      const allDepts = deptResults.flat().map(dept => dept.DEPT_NAME);
      const uniqueDepartments = [...new Set(allDepts)];
      setClickedCategoryDepartments(uniqueDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setClickedCategoryDepartments([]);
      setSubmitStatus({
        message: "Failed to load departments. Please try again.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Select All Categories
  const handleSelectAllCategories = async () => {
    if (selectAllCategories) {
      setDesignation([]);
      setGroupNo([]);
      setClickedCategoryDepartments([]);
      setSelectedDepartment([]);
      setSubDepartment([]);
      setDesignationDropdown([]);
      setSelectAllCategories(false);
      setSelectAllDepartments(false);
      setSelectAllDesignations(false);
    } else {
      const allCats = Object.keys(designationGroups);
      setDesignation(allCats);
      setSelectAllCategories(true);
      const groupNumbers = allCats.map(cat => designationGroups[cat]);
      setGroupNo(groupNumbers);

      try {
        setIsLoading(true);
        const deptPromises = groupNumbers.map(group => 
          fetch(`http://192.168.90.106:3012/api/hr/Deptlist?groupNo=${group}`).then(res => res.json())
        );
        const deptResults = await Promise.all(deptPromises);
        const allDepts = deptResults.flat().map(dept => dept.DEPT_NAME);
        const uniqueDepartments = [...new Set(allDepts)];
        setClickedCategoryDepartments(uniqueDepartments);
        setSelectedDepartment(uniqueDepartments);
        setSelectAllDepartments(true);
        await fetchDesignationsForDepartments(uniqueDepartments);
      } catch (error) {
        console.error("Error fetching all departments:", error);
        setSubmitStatus({
          message: "Failed to load all departments. Please try again.",
          type: "error"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle Department Selection
  const handleDepartmentClick = async (event) => {
    const { value } = event.target;
    
    if (value.includes("Select All")) {
      handleSelectAllDepartments();
      return;
    }
    
    setSelectedDepartment(value);
    setSelectAllDepartments(value.length === clickedCategoryDepartments.length);
    setSubDepartment([]);
    setSelectAllDesignations(false);
    
    if (value.length === 0) {
      setDesignationDropdown([]);
      return;
    }

    fetchDesignationsForDepartments(value);
  };

  // Fetch designations for selected departments
  const fetchDesignationsForDepartments = async (departments) => {
    if (!departments.length || !groupNo.length) return;
    
    setIsLoading(true);
    try {
      const allDesignationsPromises = departments.map(dept => 
        Promise.all(groupNo.map(group =>
          fetch(`http://192.168.90.106:3012/api/hr/Deptlist?groupNo=${group}&deptName=${dept}`)
            .then(response => response.json())
        ))
      );

      const results = await Promise.all(allDesignationsPromises);
      const allDesignations = results.flat(2);
      const uniqueDesignations = [...new Set(allDesignations.map(desig => desig.DESG_NAME))];
      setDesignationDropdown(uniqueDesignations);
      
      if (selectAllCategories && selectAllDepartments) {
        setSubDepartment(uniqueDesignations);
        setSelectAllDesignations(true);
      }
    } catch (error) {
      console.error("Error fetching designations:", error);
      setDesignationDropdown([]);
      setSubmitStatus({
        message: "Failed to load designations. Please try again.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Designation Selection
  const handleDesignationChange = (event) => {
    const { value } = event.target;
    
    if (value.includes("Select All")) {
      handleSelectAllDesignations();
      return;
    }
    
    setSubDepartment(value);
    setSelectAllDesignations(value.length === designationDropdown.length);
  };

  // Handle Select All Departments
  const handleSelectAllDepartments = () => {
    if (selectAllDepartments) {
      setSelectedDepartment([]);
      setSelectAllDepartments(false);
      setDesignationDropdown([]);
      setSubDepartment([]);
      setSelectAllDesignations(false);
    } else {
      const allDepts = [...clickedCategoryDepartments];
      setSelectedDepartment(allDepts);
      setSelectAllDepartments(true);
      fetchDesignationsForDepartments(allDepts);
    }
  };

  // Handle Select All Designations
  const handleSelectAllDesignations = () => {
    if (selectAllDesignations) {
      setSubDepartment([]);
      setSelectAllDesignations(false);
    } else {
      setSubDepartment([...designationDropdown]);
      setSelectAllDesignations(true);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ message: "", type: "" });
    
    // Form validation
    if (!formData.trainingSessionNo || !formData.topicName || 
        !fromTime || !toTime || !formData.venue || !formData.trainingDate ||
        !formData.trainerName || !formData.trainingType || !formData.participant ||
        designation.length === 0 || selectedDepartment.length === 0 || subdepartment.length === 0) {
      setSubmitStatus({
        message: "Please fill in all required fields",
        type: "error"
      });
      return;
    }

    // Format date to match backend expectation (DD-MM-YYYY)
    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split('-');
      return `${day}-${month}-${year}`;
    };

    // Update form data with selected values
    const updatedFormData = {
      ...formData,
      category: designation.join(","),
      department: selectedDepartment.join(","),
      designation: subdepartment.join(","),
      fromtime: fromTime ? fromTime.format("HH:mm") : "",
      totime: toTime ? toTime.format("HH:mm") : "",
      trainingDate: formData.trainingDate ? formatDate(formData.trainingDate) : "",
      participant: formData.participant // Include the participant field
    };

    try {
      setIsLoading(true);
      await axios.post("http://localhost:5000/insert-training", updatedFormData);
      setSubmitStatus({
        message: "Training scheduled successfully!",
        type: "success"
      });
      
      // Reset form after successful submission
      setFormData({
        trainingSessionNo: "",
        topicName: "",
        category: "",
        department: "",
        designation: "",
        trainerName: "",
        trainingType: "",
        fromtime: "",
        totime: "",
        venue: "",
        trainingDate: "",
        participant: "", // Reset participant field
      });
      setDesignation([]);
      setSelectedDepartment([]);
      setSubDepartment([]);
      setFromTime(null);
      setToTime(null);
      setSelectAllCategories(false);
      setSelectAllDepartments(false);
      setSelectAllDesignations(false);
      
    } catch (error) {
      console.error("Error scheduling training:", error);
      
      let errorMessage = "Failed to schedule training";
      if (error.response && error.response.data) {
        errorMessage += `: ${error.response.data.message || error.response.data.error || 'Server error'}`;
      } else {
        errorMessage += ": Network error";
      }
      
      setSubmitStatus({
        message: errorMessage,
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dashboardsidebar />
      <AdminNavbar />
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "120px", paddingLeft: "250px" }}>
          <div style={{ backgroundColor: "#1e1e1e", padding: "30px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", width: "50%", textAlign: "center", position: "relative" }}>
            <h1 style={{ color: "#ec2e2e" }}>Schedule NABH Training</h1>
            
            {/* Status message display */}
            {submitStatus.message && (
              <div style={{ 
                padding: "10px", 
                backgroundColor: submitStatus.type === "success" ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)", 
                color: submitStatus.type === "success" ? "#4CAF50" : "#F44336",
                borderRadius: "5px",
                marginBottom: "20px" 
              }}>
                {submitStatus.message}
              </div>
            )}
            
            <br /><br />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Training Session No and Topic Name */}
                <Grid item xs={6}>
                  <FormLabel>Training Session No</FormLabel>
                  <OutlinedInput 
                    name="trainingSessionNo" 
                    placeholder="Training Session No" 
                    size="small" 
                    fullWidth 
                    required 
                    value={formData.trainingSessionNo || ""} 
                    onChange={handleInputChange} 
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel>Topic Name</FormLabel>
                  <OutlinedInput 
                    name="topicName" 
                    placeholder="Enter Topic Name" 
                    size="small" 
                    fullWidth 
                    required 
                    value={formData.topicName || ""}
                    onChange={handleInputChange}
                  />
                </Grid>
                
                {/* Category Selection */}
                <Grid item xs={12} md={6}>
                  <FormLabel>Category</FormLabel>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <Checkbox 
                      checked={selectAllCategories} 
                      onChange={handleSelectAllCategories}
                      color="primary"
                    />
                    <span style={{ color: "white", fontSize: "0.9rem" }}>Select All Categories</span>
                  </div>
                  <Select 
                    name="category" 
                    multiple 
                    value={designation} 
                    onChange={handleCategoryClick} 
                    fullWidth 
                    renderValue={(selected) => selected.join(", ") || "Select Categories"}
                    disabled={isLoading}
                  >
                    {allCategories.map((cat, index) => (
                      <MenuItem key={index} value={cat.EPDMBE_GROUP_DESG_NAME}>
                        <Checkbox checked={designation.includes(cat.EPDMBE_GROUP_DESG_NAME)} />
                        <ListItemText primary={cat.EPDMBE_GROUP_DESG_NAME} />
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                {/* Department Selection - Conditional Rendering */}
                {designation.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <FormLabel>DEPARTMENT</FormLabel>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                      <Checkbox 
                        checked={selectAllDepartments} 
                        onChange={handleSelectAllDepartments}
                        color="primary"
                        disabled={clickedCategoryDepartments.length === 0 || isLoading}
                      />
                      <span style={{ color: "white", fontSize: "0.9rem" }}>Select All Departments</span>
                    </div>
                    <Select 
                      name="department" 
                      multiple 
                      value={selectedDepartment} 
                      onChange={handleDepartmentClick} 
                      fullWidth 
                      renderValue={(selected) => selected.join(", ") || "Select Departments"}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <MenuItem disabled>Loading departments...</MenuItem>
                      ) : (
                        clickedCategoryDepartments.map((dept, index) => (
                          <MenuItem key={index} value={dept}>
                            <Checkbox checked={selectedDepartment.includes(dept)} />
                            <ListItemText primary={dept} />
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </Grid>
                )}
                
                {/* Designation Selection - Conditional Rendering */}
                {selectedDepartment.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <FormLabel>DESIGNATION</FormLabel>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                      <Checkbox 
                        checked={selectAllDesignations} 
                        onChange={handleSelectAllDesignations}
                        color="primary"
                        disabled={designationDropdown.length === 0 || isLoading}
                      />
                      <span style={{ color: "white", fontSize: "0.9rem" }}>Select All Designations</span>
                    </div>
                    <Select
                      name="designation"
                      multiple
                      value={subdepartment}
                      onChange={handleDesignationChange}
                      fullWidth
                      displayEmpty
                      renderValue={(selected) => (selected.length > 0 ? selected.join(", ") : "Select Designation")}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <MenuItem disabled>Loading designations...</MenuItem>
                      ) : (
                        designationDropdown.map((desig, index) => (
                          <MenuItem key={index} value={desig}>
                            <Checkbox checked={subdepartment.includes(desig)} />
                            <ListItemText primary={desig} />
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </Grid>
                )}
              </Grid>  
              
              {/* Trainer Name */}
              <Grid style={{ marginLeft: "1px", marginTop: "30px", width: "320px" }}>
                <FormLabel>Trainer Name</FormLabel>
                <OutlinedInput
                  name="trainerName"
                  placeholder="Enter Trainer Name"
                  size="small"
                  fullWidth
                  required
                  value={formData.trainerName || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              
              {/* Training Type */}
              <Grid style={{ marginTop: "-60px", width: "320px", marginLeft: "350px" }}>
                <FormLabel>Training Type</FormLabel>
                <Select 
                  name="trainingType" 
                  fullWidth
                  value={formData.trainingType || ""}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="">Select Training Type</MenuItem>
                  <MenuItem value="Induction Program">Induction Program</MenuItem>
                  <MenuItem value="On Job Training">On Job Training</MenuItem>
                  <MenuItem value="Customized/Softskills Training">Customized/Softskills Training</MenuItem>
                </Select>
              </Grid>
              
              {/* Time Selection */}
              <Grid container spacing={3} style={{ marginTop: "20px" }}>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="From Time"
                      name="fromtime"
                      value={fromTime}
                      onChange={(newValue) => setFromTime(newValue)}
                      fullWidth
                      slotProps={{ textField: { required: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="To Time"
                      name="totime"
                      value={toTime}
                      onChange={(newValue) => setToTime(newValue)}
                      fullWidth
                      slotProps={{ textField: { required: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              
              {/* Venue and Date */}
              <Grid container spacing={3} style={{ marginTop: "20px" }}>
                <Grid item xs={12} md={6}>
                  <FormLabel>Venue</FormLabel>
                  <Select 
                    name="venue" 
                    fullWidth
                    value={formData.venue || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <MenuItem value="">Select Venue</MenuItem>
                    <MenuItem value="Hall A">Hall A</MenuItem>
                    <MenuItem value="Conference Room">Conference Room</MenuItem>
                    <MenuItem value="Auditorium">Auditorium</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormLabel>Date</FormLabel>
                  <OutlinedInput 
                    type="date" 
                    name="trainingDate" 
                    fullWidth 
                    required
                    value={formData.trainingDate || ""}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              
              {/* Participant Field - ADDED NEW FIELD */}
              <Grid container spacing={3} style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                  <FormLabel>Number of Participants</FormLabel>
                  <OutlinedInput 
                    name="participant" 
                    placeholder="Enter number of participants or participant details" 
                    size="small" 
                    fullWidth 
                    required
                    value={formData.participant || ""}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              
              {/* Submit Button */}
              <Button 
                variant="contained" 
                color="primary" 
                style={{ marginTop: "40px" }} 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </ThemeProvider>
      <Button variant="contained" className="fixed-button" style={{ marginTop: "-950px" }} onClick={() => navigate('/AdminPostupcomingtraining')}>Upcoming NABH Trainings</Button>

    </>
  );
}

export default AdminPosttraining;