// import { useState, useEffect, useMemo } from 'react';
// import * as React from 'react';
// import AdminNavbar from "../src/AdminNavbar";
// import Dashboard from "./Dashboard_sidebar";
// import {Grid,FormLabel,OutlinedInput,Select,MenuItem,Button,styled,ThemeProvider,createTheme,IconButton,Checkbox,ListItemText } from "@mui/material";
// // import { Add, Remove } from "@mui/icons-material";
// import "./ApplyLeave.css";
// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from "react-router-dom";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     background: { default: "#121212", paper: "#1e1e1e" },
//     text: { primary: "#ffffff" },
//   },
// });

// const FormContainer = styled("div")({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "flex-center",
//   height: "100vh",
//   paddingTop: "100px",
// });

// const FormBox = styled("div")({
//   backgroundColor: "#1e1e1e",
//   padding: "30px",
//   borderRadius: "10px",
//   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//   width: "50%",
//   textAlign: "center",
// });


// const Admintrainingfeedback = () => {
//   const navigate = useNavigate();
//   const [leaveForm, setLeaveForm] = useState({
//     name: "",
//     employeeId: "",
//     trainername:"",
//     trainerId : "",
//     trainingtype: "",
//     date: "",
//     reason: "",
//   });

//   const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
//    const [designation, setDesignation] = useState("");
//        //const [filteredDepartments, setFilteredDepartments] = useState([]);
//        const [selectedDepartment, setSelectedDepartment] = useState("");
//        //const [allDepartments, setAllDepartments] = useState([]);
//        const [allCategories, setAllCategories] = useState([]);
//   const [clickedCategoryDepartments, setClickedCategoryDepartments] = useState([]);
//   const [designationDropdown, setDesignationDropdown] = useState([]);
//   const [groupNo, setGroupNo] = useState([]);
//   const [subdepartment, setSubDepartment] = useState([]);
//   // const [fromTime, setFromTime] = useState(null);
//   // const [toTime, setToTime] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectAllCategories, setSelectAllCategories] = useState(false);
//   const [selectAllDepartments, setSelectAllDepartments] = useState(false);
//   const [selectAllDesignations, setSelectAllDesignations] = useState(false);
//   const [/*submitStatus*/, setSubmitStatus] = useState({ message: "", type: "" });

//         const designationGroups = useMemo(
//            () => ({
//              admin: "4",
//              teaching: "1",
//              nursing: "3",
//              technician: "2",
//              "class industrial visit employees": "5",
//            }),
//            []
//          );
       

//   const handlePostClick = () => {
//     navigate('/Admintrainingfeedbackhistory'); // This will navigate to the /admin-posttraining route
//   };

//   const handletrainingfeedbackChange = (e) => {
//     const { name, value } = e.target;
//     setLeaveForm({ ...leaveForm, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(leaveForm);
//   };

//   const [questions, setQuestions] = useState([]);

//   const addQuestion = () => {
//     setQuestions([...questions, { text: "", options: ["", "", "", ""] }]);
//   };

//   const removeQuestion = (index) => {
//     const newQuestions = [...questions];
//     newQuestions.splice(index, 1);
//     setQuestions(newQuestions);
//   };

//   const handleQuestionChange = (index, value) => {
//     const newQuestions = [...questions];
//     newQuestions[index].text = value;
//     setQuestions(newQuestions);
//   };

//   const handleOptionChange = (qIndex, oIndex, value) => {
//     const newQuestions = [...questions];
//     newQuestions[qIndex].options[oIndex] = value;
//     setQuestions(newQuestions);
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/Designations");
//         if (!response.ok) throw new Error("Failed to fetch categories");
//         const data = await response.json();
//         setAllCategories(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setAllCategories([]);
//         setSubmitStatus({
//           message: "Failed to load categories. Please refresh the page.",
//           type: "error"
//         });
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Check if all categories/departments/designations are selected
//   useEffect(() => {
//     setSelectAllCategories(designation.length === Object.keys(designationGroups).length);
//     setSelectAllDepartments(selectedDepartment.length === clickedCategoryDepartments.length && clickedCategoryDepartments.length > 0);
//     setSelectAllDesignations(subdepartment.length === designationDropdown.length && designationDropdown.length > 0);
//   }, [designation, selectedDepartment, subdepartment, clickedCategoryDepartments, designationDropdown, designationGroups]);

//   // Handle Category Selection
//   const handleCategoryClick = async (event) => {
//     const value = event.target.value;

//     if (value.includes("Select All")) {
//       handleSelectAllCategories();
//       return;
//     }

//     setDesignation(value);
//     const groupNumbers = value.map(cat => designationGroups[cat]);
//     setGroupNo(groupNumbers);

//     // Reset departments and designations
//     setSelectedDepartment([]);
//     setSubDepartment([]);
//     setDesignationDropdown([]);
//     setSelectAllDepartments(false);
//     setSelectAllDesignations(false);

//     if (groupNumbers.length === 0) {
//       setClickedCategoryDepartments([]);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const deptPromises = groupNumbers.map(group => 
//         fetch(`http://192.168.90.106:3012/api/hr/Deptlist?groupNo=${group}`).then(res => res.json())
//       );
//       const deptResults = await Promise.all(deptPromises);
//       const allDepts = deptResults.flat().map(dept => dept.DEPT_NAME);
//       const uniqueDepartments = [...new Set(allDepts)];
//       setClickedCategoryDepartments(uniqueDepartments);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       setClickedCategoryDepartments([]);
//       setSubmitStatus({
//         message: "Failed to load departments. Please try again.",
//         type: "error"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle Select All Categories
//   const handleSelectAllCategories = async () => {
//     if (selectAllCategories) {
//       setDesignation([]);
//       setGroupNo([]);
//       setClickedCategoryDepartments([]);
//       setSelectedDepartment([]);
//       setSubDepartment([]);
//       setDesignationDropdown([]);
//       setSelectAllCategories(false);
//       setSelectAllDepartments(false);
//       setSelectAllDesignations(false);
//     } else {
//       const allCats = Object.keys(designationGroups);
//       setDesignation(allCats);
//       setSelectAllCategories(true);
//       const groupNumbers = allCats.map(cat => designationGroups[cat]);
//       setGroupNo(groupNumbers);

//       try {
//         setIsLoading(true);
//         const deptPromises = groupNumbers.map(group => 
//           fetch(`http://192.168.90.106:3012/api/hr/Deptlist?groupNo=${group}`).then(res => res.json())
//         );
//         const deptResults = await Promise.all(deptPromises);
//         const allDepts = deptResults.flat().map(dept => dept.DEPT_NAME);
//         const uniqueDepartments = [...new Set(allDepts)];
//         setClickedCategoryDepartments(uniqueDepartments);
//         setSelectedDepartment(uniqueDepartments);
//         setSelectAllDepartments(true);
//         await fetchDesignationsForDepartments(uniqueDepartments);
//       } catch (error) {
//         console.error("Error fetching all departments:", error);
//         setSubmitStatus({
//           message: "Failed to load all departments. Please try again.",
//           type: "error"
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   // Handle Department Selection
//   const handleDepartmentClick = async (event) => {
//     const { value } = event.target;
    
//     if (value.includes("Select All")) {
//       handleSelectAllDepartments();
//       return;
//     }
    
//     setSelectedDepartment(value);
//     setSelectAllDepartments(value.length === clickedCategoryDepartments.length);
//     setSubDepartment([]);
//     setSelectAllDesignations(false);
    
//     if (value.length === 0) {
//       setDesignationDropdown([]);
//       return;
//     }

//     fetchDesignationsForDepartments(value);
//   };

//   // Fetch designations for selected departments
//   const fetchDesignationsForDepartments = async (departments) => {
//     if (!departments.length || !groupNo.length) return;
    
//     setIsLoading(true);
//     try {
//       const allDesignationsPromises = departments.map(dept => 
//         Promise.all(groupNo.map(group =>
//           fetch(`http://192.168.90.106:3012/api/hr/Deptlist?groupNo=${group}&deptName=${dept}`)
//             .then(response => response.json())
//         ))
//       );

//       const results = await Promise.all(allDesignationsPromises);
//       const allDesignations = results.flat(2);
//       const uniqueDesignations = [...new Set(allDesignations.map(desig => desig.DESG_NAME))];
//       setDesignationDropdown(uniqueDesignations);
      
//       if (selectAllCategories && selectAllDepartments) {
//         setSubDepartment(uniqueDesignations);
//         setSelectAllDesignations(true);
//       }
//     } catch (error) {
//       console.error("Error fetching designations:", error);
//       setDesignationDropdown([]);
//       setSubmitStatus({
//         message: "Failed to load designations. Please try again.",
//         type: "error"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle Designation Selection
//   const handleDesignationChange = (event) => {
//     const { value } = event.target;
    
//     if (value.includes("Select All")) {
//       handleSelectAllDesignations();
//       return;
//     }
    
//     setSubDepartment(value);
//     setSelectAllDesignations(value.length === designationDropdown.length);
//   };

//   // Handle Select All Departments
//   const handleSelectAllDepartments = () => {
//     if (selectAllDepartments) {
//       setSelectedDepartment([]);
//       setSelectAllDepartments(false);
//       setDesignationDropdown([]);
//       setSubDepartment([]);
//       setSelectAllDesignations(false);
//     } else {
//       const allDepts = [...clickedCategoryDepartments];
//       setSelectedDepartment(allDepts);
//       setSelectAllDepartments(true);
//       fetchDesignationsForDepartments(allDepts);
//     }
//   };

//   // Handle Select All Designations
//   const handleSelectAllDesignations = () => {
//     if (selectAllDesignations) {
//       setSubDepartment([]);
//       setSelectAllDesignations(false);
//     } else {
//       setSubDepartment([...designationDropdown]);
//       setSelectAllDesignations(true);
//     }
//   };

//   // Handle form input changes
//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData({
//   //     ...formData,
//   //     [name]: value
//   //   });
//   // };

//   // Handle form submission
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setSubmitStatus({ message: "", type: "" });
    
//   //   // Form validation
//   //   if (!formData.trainingSessionNo || !formData.topicName || 
//   //       !fromTime || !toTime || !formData.venue || !formData.trainingDate ||
//   //       !formData.trainerName || !formData.trainingType || !formData.participant ||
//   //       designation.length === 0 || selectedDepartment.length === 0 || subdepartment.length === 0) {
//   //     setSubmitStatus({
//   //       message: "Please fill in all required fields",
//   //       type: "error"
//   //     });
//   //     return;
//   //   }

//   //   // Format date to match backend expectation (DD-MM-YYYY)
//   //   const formatDate = (dateString) => {
//   //     const [year, month, day] = dateString.split('-');
//   //     return `${day}-${month}-${year}`;
//   //   };

//   //   // Update form data with selected values
//   //   const updatedFormData = {
//   //     ...formData,
//   //     category: designation.join(","),
//   //     department: selectedDepartment.join(","),
//   //     designation: subdepartment.join(","),
//   //     fromtime: fromTime ? fromTime.format("HH:mm") : "",
//   //     totime: toTime ? toTime.format("HH:mm") : "",
//   //     trainingDate: formData.trainingDate ? formatDate(formData.trainingDate) : "",
//   //     participant: formData.participant // Include the participant field
//   //   };

//   //   try {
//   //     setIsLoading(true);
//   //     await axios.post("http://localhost:5000/insert-training", updatedFormData);
//   //     setSubmitStatus({
//   //       message: "Training scheduled successfully!",
//   //       type: "success"
//   //     });
      
//   //     // Reset form after successful submission
//   //     setFormData({
//   //       trainingSessionNo: "",
//   //       topicName: "",
//   //       category: "",
//   //       department: "",
//   //       designation: "",
//   //       trainerName: "",
//   //       trainingType: "",
//   //       fromtime: "",
//   //       totime: "",
//   //       venue: "",
//   //       trainingDate: "",
//   //       participant: "", // Reset participant field
//   //     });
//   //     setDesignation([]);
//   //     setSelectedDepartment([]);
//   //     setSubDepartment([]);
//   //     setFromTime(null);
//   //     setToTime(null);
//   //     setSelectAllCategories(false);
//   //     setSelectAllDepartments(false);
//   //     setSelectAllDesignations(false);
      
//   //   } catch (error) {
//   //     console.error("Error scheduling training:", error);
      
//   //     let errorMessage = "Failed to schedule training";
//   //     if (error.response && error.response.data) {
//   //       errorMessage += `: ${error.response.data.message || error.response.data.error || 'Server error'}`;
//   //     } else {
//   //       errorMessage += ": Network error";
//   //     }
      
//   //     setSubmitStatus({
//   //       message: errorMessage,
//   //       type: "error"
//   //     });
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
  
  

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <Dashboard/>
//       <AdminNavbar />
//       <FormContainer>
//         <FormBox>
//           <h1 style={{ color: "#ec2e2e" }}>Training Feedback</h1><br /><br />
//           <form onSubmit={handleSubmit} style={{marginLeft:"20px"}}>
//             <Grid container spacing={3}>
//               <Grid container spacing={3}>
//                               <Grid item xs={6}>
//                                 <FormLabel>Training Session No</FormLabel>
//                                 <OutlinedInput
//                                   name="trainingsessionNo"
//                                   placeholder="Training Session No"
//                                   size="small"
//                                   fullWidth
//                                 />
//                               </Grid>
//                               <Grid item xs={6}>
//                                 <FormLabel>Topic Name</FormLabel>
//                                 <OutlinedInput
//                                   name="topicName"
//                                   placeholder="Enter Topic Name"
//                                   size="small"
//                                   fullWidth
//                                 />
//                                 </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormLabel>Trainer Name</FormLabel>
//                 <OutlinedInput
//                   name="trainername"
//                   placeholder="Enter Trainer Name"
//                   fullWidth
//                   size="small"
//                   onChange={handletrainingfeedbackChange}
//                 />
//               </Grid>
              
//              <Grid item xs={12} md={6}>
//                                 <FormLabel>Training Type</FormLabel>
//                                 <Select name="trainingtype" fullWidth>
//                                   <MenuItem value="">Select Training Type</MenuItem>
//                                   <MenuItem value="Induction Program">Induction Program</MenuItem>
//                                  <MenuItem value="On Job Training">On Job Training</MenuItem>
//                                   <MenuItem value="Customized/Softskills Training">Customized/Softskills Training</MenuItem>
//                                 </Select>
//                               </Grid>
                             
//                                        <Grid item xs={6} md={6}>
//                                            <FormLabel>Date</FormLabel>
//                                            <OutlinedInput
//                                                type="date"
//                                                name="date"
//                                                fullWidth
//                                                onChange={handletrainingfeedbackChange} />
//                                        </Grid>
//                                        <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
//   <LocalizationProvider dateAdapter={AdapterDayjs}>
//     <DemoContainer components={['TimePicker']}>
//       <TimePicker
//         label="Time"
//         value={value}
//         onChange={(newValue) => setValue(newValue)}
//         fullWidth // Ensures it takes the full width available
//       />
//     </DemoContainer>
//   </LocalizationProvider>
// </Grid>

//               {/* <Grid item xs={12}>
//                 <FormLabel>Feedback about the Training</FormLabel>
//                 <OutlinedInput
//                   name="feedback"
//                   placeholder="Enter Feedback"
//                   fullWidth
//                   multiline
//                   rows={3}
//                   onChange={handletrainingfeedbackChange}
//                 />
//               </Grid> */}

//                  <Grid item xs={12} md={6}>
//                                   <FormLabel>Category</FormLabel>
//                                   <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
//                                     <Checkbox 
//                                       checked={selectAllCategories} 
//                                       onChange={handleSelectAllCategories}
//                                       color="primary"
//                                     />
//                                     <span style={{ color: "white", fontSize: "0.9rem" }}>Select All Categories</span>
//                                   </div>
//                                   <Select 
//                                     name="category" 
//                                     multiple 
//                                     value={designation} 
//                                     onChange={handleCategoryClick} 
//                                     fullWidth 
//                                     renderValue={(selected) => selected.join(", ") || "Select Categories"}
//                                     disabled={isLoading}
//                                   >
//                                     {allCategories.map((cat, index) => (
//                                       <MenuItem key={index} value={cat.EPDMBE_GROUP_DESG_NAME}>
//                                         <Checkbox checked={designation.includes(cat.EPDMBE_GROUP_DESG_NAME)} />
//                                         <ListItemText primary={cat.EPDMBE_GROUP_DESG_NAME} />
//                                       </MenuItem>
//                                     ))}
//                                   </Select>
//                                 </Grid>
                
//                                 {/* Department Selection - Conditional Rendering */}
//                                 {designation.length > 0 && (
//                                   <Grid item xs={12} md={6}>
//                                     <FormLabel>DEPARTMENT</FormLabel>
//                                     <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
//                                       <Checkbox 
//                                         checked={selectAllDepartments} 
//                                         onChange={handleSelectAllDepartments}
//                                         color="primary"
//                                         disabled={clickedCategoryDepartments.length === 0 || isLoading}
//                                       />
//                                       <span style={{ color: "white", fontSize: "0.9rem" }}>Select All Departments</span>
//                                     </div>
//                                     <Select 
//                                       name="department" 
//                                       multiple 
//                                       value={selectedDepartment} 
//                                       onChange={handleDepartmentClick} 
//                                       fullWidth 
//                                       renderValue={(selected) => selected.join(", ") || "Select Departments"}
//                                       disabled={isLoading}
//                                     >
//                                       {isLoading ? (
//                                         <MenuItem disabled>Loading departments...</MenuItem>
//                                       ) : (
//                                         clickedCategoryDepartments.map((dept, index) => (
//                                           <MenuItem key={index} value={dept}>
//                                             <Checkbox checked={selectedDepartment.includes(dept)} />
//                                             <ListItemText primary={dept} />
//                                           </MenuItem>
//                                         ))
//                                       )}
//                                     </Select>
//                                   </Grid>
//                                 )}
                                
//                                 {/* Designation Selection - Conditional Rendering */}
//                                 {selectedDepartment.length > 0 && (
//                                   <Grid item xs={12} md={6}>
//                                     <FormLabel>DESIGNATION</FormLabel>
//                                     <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
//                                       <Checkbox 
//                                         checked={selectAllDesignations} 
//                                         onChange={handleSelectAllDesignations}
//                                         color="primary"
//                                         disabled={designationDropdown.length === 0 || isLoading}
//                                       />
//                                       <span style={{ color: "white", fontSize: "0.9rem" }}>Select All Designations</span>
//                                     </div>
//                                     <Select
//                                       name="designation"
//                                       multiple
//                                       value={subdepartment}
//                                       onChange={handleDesignationChange}
//                                       fullWidth
//                                       displayEmpty
//                                       renderValue={(selected) => (selected.length > 0 ? selected.join(", ") : "Select Designation")}
//                                       disabled={isLoading}
//                                     >
//                                       {isLoading ? (
//                                         <MenuItem disabled>Loading designations...</MenuItem>
//                                       ) : (
//                                         designationDropdown.map((desig, index) => (
//                                           <MenuItem key={index} value={desig}>
//                                             <Checkbox checked={subdepartment.includes(desig)} />
//                                             <ListItemText primary={desig} />
//                                           </MenuItem>
//                                         ))
//                                       )}
//                                     </Select>
//                                   </Grid>
//                                 )}  
//                  </Grid>
//                                                                                                               <Grid item>
//   <FormLabel>Questions</FormLabel>
// </Grid>
// <br />
// <Grid item>
//   <Button variant="contained" color="primary" onClick={addQuestion}>+</Button>
// </Grid></Grid>
// <br />
// {questions.map((question, qIndex) => (
//   <Grid container spacing={2} alignItems="center" key={qIndex} sx={{ marginBottom: 3 }}>
//     <Grid item xs={12} md={10}>
//       <OutlinedInput
//         fullWidth
//         placeholder={`Question ${qIndex + 1}`}
//         value={question.text}
//         onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
//         endAdornment={
//           <IconButton onClick={() => removeQuestion(qIndex)}>
//             <DeleteIcon color="error" />
//           </IconButton>
//         }
//       />
//     </Grid>
//     {question.options.map((option, oIndex) => (
//       <Grid item xs={12} md={6} key={oIndex}>
//         <OutlinedInput
//           fullWidth
//           placeholder={`Option ${oIndex + 1}`}
//           value={option}
//           onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
//         />
//       </Grid>
//     ))}
//   </Grid>
// ))}

//               <Grid item xs={12} >
//                 <Button type="submit" variant="contained" color="primary" size="large">
//                   Submit
//                 </Button>
//               </Grid>
//           </form>
//         </FormBox>
//       </FormContainer>
//         <Button variant="contained" className="fixed-button" style={{marginTop:"-800px"}}  onClick={handlePostClick} >Feedback History</Button> 
//     </ThemeProvider>
      
//   );
// };

// export default Admintrainingfeedback;

import { useState, useEffect, useMemo } from 'react';
import * as React from 'react';
import AdminNavbar from "../src/AdminNavbar";
import Dashboard from "./Dashboard_sidebar";
import {Grid, FormLabel, OutlinedInput, Select, MenuItem, Button, styled, ThemeProvider, createTheme, /*IconButton*/ Checkbox, ListItemText } from "@mui/material";
import "./ApplyLeave.css";
// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import DeleteIcon from '@mui/icons-material/Delete';
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


const Admintrainingfeedback = () => {
  const navigate = useNavigate();
  const [FeedbackForm, setFeedbackForm] = useState({
    employeeId: "",
    trainername: "",
    trainerId: "",
    trainingtype: "", // Initialize as empty string
    date: "",
    reason: "",
  });

  // const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
  const [designation, setDesignation] = useState([]);  // Initialize as empty array
  const [selectedDepartment, setSelectedDepartment] = useState([]);  // Initialize as empty array
  const [allCategories, setAllCategories] = useState([]);
  const [clickedCategoryDepartments, setClickedCategoryDepartments] = useState([]);
  const [designationDropdown, setDesignationDropdown] = useState([]);
  const [groupNo, setGroupNo] = useState([]);
  const [subdepartment, setSubDepartment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectAllCategories, setSelectAllCategories] = useState(false);
  const [selectAllDepartments, setSelectAllDepartments] = useState(false);
  const [selectAllDesignations, setSelectAllDesignations] = useState(false);
  const [/*submitStatus*/, setSubmitStatus] = useState({ message: "", type: "" });

  const designationGroups = useMemo(() => ({
    "ADMINISTRATIVE STAFF": "4",
    TEACHING: "1",
    NURSING: "3",
    TECHNICIAN: "2",
    "CLASS IV EMPLOYEES": "5",
  }), []);
       

  const handlePostClick = () => {
    navigate('/Admintrainingfeedbackhistory'); // Navigate to the feedback history page
  };

  const handletrainingfeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm({ ...FeedbackForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(FeedbackForm);
    // console.log(questions);
    // Add your submission logic here
  };

  // const [questions, setQuestions] = useState([]);

  // const addQuestion = () => {
  //   setQuestions([...questions, { text: "", options: ["", "", "", ""] }]);
  // };

  // const removeQuestion = (index) => {
  //   const newQuestions = [...questions];
  //   newQuestions.splice(index, 1);
  //   setQuestions(newQuestions);
  // };

  // const handleQuestionChange = (index, value) => {
  //   const newQuestions = [...questions];
  //   newQuestions[index].text = value;
  //   setQuestions(newQuestions);
  // };

  // const handleOptionChange = (qIndex, oIndex, value) => {
  //   const newQuestions = [...questions];
  //   newQuestions[qIndex].options[oIndex] = value;
  //   setQuestions(newQuestions);
  // };

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

  // Handle training type change
  const handleTrainingTypeChange = (e) => {
    setFeedbackForm({ ...FeedbackForm, trainingtype: e.target.value });
  };

  // const handleCorrectAnswerChange = (qIndex, value) => {
  //   const updatedQuestions = [...questions];
  //   updatedQuestions[qIndex].correctAnswer = value;
  //   setQuestions(updatedQuestions);
  // };
  

  return (
    <ThemeProvider theme={darkTheme}>
      <Dashboard/>
      <AdminNavbar />
      <FormContainer>
        <FormBox>
          <h1 style={{ color: "#ec2e2e" }}>Training Feedback</h1><br /><br />
          <form onSubmit={handleSubmit} style={{marginLeft:"20px"}}>
            <Grid container spacing={3}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormLabel>Training Session No</FormLabel>
                  <OutlinedInput
                    name="trainingsessionNo"
                    placeholder="Training Session No"
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
                    fullWidth 
                    value={FeedbackForm.trainingtype}
                    onChange={handleTrainingTypeChange}
                  >
                    <MenuItem value="">Select Training Type</MenuItem>
                    <MenuItem value="Induction Program">Induction Program</MenuItem>
                    <MenuItem value="On Job Training">On Job Training</MenuItem>
                    <MenuItem value="Customized/Softskills Training">Customized/Softskills Training</MenuItem>
                  </Select>
                </Grid>
                             
                <Grid item xs={6} md={6} style={{marginLeft:"30px"}}>
                  <FormLabel>Date</FormLabel>
                  <OutlinedInput
                    type="date"
                    name="date"
                    fullWidth
                    onChange={handletrainingfeedbackChange} 
                  />
                </Grid>
                {/* <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                      <TimePicker
                        label="Time"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        fullWidth
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid> */}

               
\ <Grid item xs={12} md={6}>
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
              </Grid>
{/*
<FormLabel style={{ marginTop: "50px" }}>Questions</FormLabel>
<br />
<Grid item>
<Button
    variant="contained"
    color="primary"
    onClick={addQuestion}
    style={{ marginTop: "-80px", marginLeft: "-500px" }}
  >
    +
  </Button>
  <br />
  <br />
  {questions.map((question, qIndex) => (
    <Grid container spacing={2} alignItems="center" key={qIndex} sx={{ marginBottom: 3 }}>
      <Grid item xs={12} md={10}>
        <OutlinedInput
          fullWidth
          placeholder={`Question ${qIndex + 1}`}
          value={question.text}
          onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          endAdornment={
            <IconButton onClick={() => removeQuestion(qIndex)}>
              <DeleteIcon color="error" />
            </IconButton>
          }
        />
      </Grid>

   
      {question.options.map((option, oIndex) => (
        <Grid item xs={12} md={6} key={oIndex}>
          <OutlinedInput
            fullWidth
            placeholder={`Option ${oIndex + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
          />
        </Grid>
      ))}

     
      <Grid item xs={12} md={10}>
        <OutlinedInput
          fullWidth
          placeholder="Correct Answer"
          value={question.correctAnswer || ""}
          onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
        />
      </Grid>
    </Grid>
  ))} */}
<br />

<Grid item xs={6}>
                  <FormLabel>Feedback Link of Today's Training</FormLabel>
                  <OutlinedInput
                    name="FeedbackTraining"
                    placeholder="Enter Feedback Link"
                    size="small"
                    fullWidth
                  />
                </Grid>

<br />
              <Grid item xs={12} md={6}>
                <Button type="submit" variant="contained" color="primary" size="large">
                  Submit
                </Button>
              </Grid>
          </form>
        </FormBox>
      </FormContainer>
      <Button variant="contained" className="fixed-button" style={{marginTop:"-800px"}} onClick={handlePostClick}>Feedback History</Button> 
    </ThemeProvider>
  );
};

export default Admintrainingfeedback;