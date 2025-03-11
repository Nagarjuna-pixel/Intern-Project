// import { useState } from 'react';
// import * as React from 'react';
// import './AdminDashboard.css'; // Create a separate CSS file for styling
// import Dashboardsidebar from './Dashboard_sidebar.jsx';
// import AdminNavbar from './AdminNavbar.jsx';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
// import { useNavigate } from "react-router-dom";

// function AdminPostupcomingtraining() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: theme.palette.primary.main,
//     '&:hover': {
//       backgroundColor: theme.palette.primary.dark,
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(-100),
//       width: 'auto',
//     },
//   }));

//   const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }));

//   const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     width: '100%',
//     '& .MuiInputBase-input': {
//       padding: theme.spacing(1, 1, 1, 0),
//       paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//       transition: theme.transitions.create('width'),
//       [theme.breakpoints.up('sm')]: {
//         width: '12ch',
//         '&:focus': {
//           width: '20ch',
//         },
//       },
//     },
//   }));

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//       textAlign: "center",
//       fontWeight: "bold",
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//       textAlign: "center",
//     },
//   }));

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover,
//     },
//     '&:last-child td, &:last-child th': {
//       border: 0,
//     },
//   }));

//   function createData(Training_Type, Trainer_Name, designation, department, Date, time, venue) {
//     return { Training_Type, Trainer_Name, Date, designation, department, time, venue };
//   }

//   const rows = [
//     createData('Surgical operations', 'Anthonydas', 'Surgical', 'Heart Surgery', '18-02-25', '9.00AM', 'B-block'),
//     createData('Eliminate Firing', 'Harolddas', 'Firing', 'Fire Extinguishing', '17-02-25', '11.00AM', 'A-block'),
//   ];

//   const filteredRows = rows.filter(row =>
//     Object.values(row).some(value =>
//       value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   return (
//     <>
//       <Dashboardsidebar />
//       <AdminNavbar />
//       <div style={{ padding: "100px", marginLeft: "200px", paddingTop: "100px" }}>
//         <h2 style={{ textAlign: "center", color: "#ec2e2e" }}>Upcoming NABH Trainings</h2><br /><br /><br /><br />
//         <Search style={{ width: "200px", marginLeft: "1000px", marginTop: "-30px", borderColor: "black" }}>
//           <SearchIconWrapper>
//             <SearchIcon />
//           </SearchIconWrapper>
//           <StyledInputBase
//             placeholder="Search…"
//             inputProps={{ 'aria-label': 'search' }}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </Search>
//         <br /><br />
//         <TableContainer component={Paper} style={{ width: "100%", overflowX: "auto" }}>
//           <Table sx={{ minWidth: 900 }} stickyHeader aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell>Training Topic</StyledTableCell>
//                 <StyledTableCell>Trainer Name</StyledTableCell>
//                 <StyledTableCell>Designation</StyledTableCell>
//                 <StyledTableCell>Departments</StyledTableCell>
//                 <StyledTableCell>Date</StyledTableCell>
//                 <StyledTableCell>Time</StyledTableCell>
//                 <StyledTableCell>Venue</StyledTableCell>
//                 <StyledTableCell>Cancel</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredRows.length > 0 ? (
//                 filteredRows.map((row, index) => (
//                   <StyledTableRow key={index}>
//                     <StyledTableCell>{row.Training_Type}</StyledTableCell>
//                     <StyledTableCell>{row.Trainer_Name}</StyledTableCell>
//                     <StyledTableCell>{row.designation}</StyledTableCell>
//                     <StyledTableCell>{row.department}</StyledTableCell>
//                     <StyledTableCell>{row.Date}</StyledTableCell>
//                     <StyledTableCell>{row.time}</StyledTableCell>
//                     <StyledTableCell>{row.venue}</StyledTableCell>
//                     <StyledTableCell>
//                       <Button variant="contained" color="error">
//                         Cancel
//                       </Button>
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 ))
//               ) : (
//                 <StyledTableRow>
//                   <StyledTableCell colSpan={8} style={{ textAlign: 'center' }}>No results found</StyledTableCell>
//                 </StyledTableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//       <div style={{display:"flex",marginLeft:"1000px", marginTop:"-365px", position:"relative"}}>
//           <Button variant="contained" className="upcoming-button" onClick={() => navigate('/AdminPosttraininghistory')}>NABH Training History</Button>
//         </div>
//     </>
//   );
// }

// export default AdminPostupcomingtraining;

import { useState, useEffect } from 'react';
import * as React from 'react';
import './AdminDashboard.css'; // Create a separate CSS file for styling
import Dashboardsidebar from './Dashboard_sidebar.jsx';
import AdminNavbar from './AdminNavbar.jsx';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Make sure axios is installed

function AdminPostupcomingtraining() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchTrainingSchedules = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/training-schedules");
        if (response.data.success) {
          // Only set data if there are records returned
          if (response.data.data && response.data.data.length > 0) {
            setTrainingData(response.data.data);
          } else {
            setTrainingData([]);
          }
        } else {
          setError('Failed to load training schedules');
        }
      } catch (err) {
        setError(err.message || 'Error fetching training schedules');
        console.error('Error fetching training schedules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingSchedules();
  }, []);

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(-100),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      textAlign: "center",
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: "center",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // Handle training cancellation
  const handleCancelTraining = async (trainingSessionNo) => {
    try {
      const response = await axios.post('/api/cancel-training', { trainingSessionNo });
      
      if (response.data.success) {
        // Refresh data after successful cancellation
        const updatedResponse = await axios.get('/api/training-schedules');
        if (updatedResponse.data.success) {
          if (updatedResponse.data.data && updatedResponse.data.data.length > 0) {
            setTrainingData(updatedResponse.data.data);
          } else {
            setTrainingData([]);
          }
        }
      } else {
        // Handle unsuccessful cancellation
        console.error('Error cancelling training:', response.data.error);
      }
    } catch (err) {
      console.error('Error cancelling training:', err);
      // You might want to add some user feedback here
      alert('Failed to cancel training. Please try again.');
    }
  };

  // Filter the training data based on search query
  const filteredData = trainingData.filter(item =>
    Object.values(item).some(value =>
      value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <Dashboardsidebar />
      <AdminNavbar />
      <div style={{ padding: "100px", marginLeft: "200px", paddingTop: "100px" }}>
        <h2 style={{ textAlign: "center", color: "#ec2e2e" }}>Upcoming NABH Trainings</h2><br /><br /><br /><br />
        <Search style={{ width: "200px", marginLeft: "1000px", marginTop: "-30px", borderColor: "black" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>
        <br /><br />
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>
        ) : (
          <TableContainer component={Paper} style={{ width: "100%", overflowX: "auto" }}>
            <Table sx={{ minWidth: 1100 }} stickyHeader aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Training Topic</StyledTableCell>
                  <StyledTableCell>Trainer Name</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell>Departments</StyledTableCell>
                  <StyledTableCell>Designation</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Time</StyledTableCell>
                  <StyledTableCell>Venue</StyledTableCell>
                  <StyledTableCell>Participants</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((training) => (
                    <StyledTableRow key={training.TRAININGSESSIONNO}>
                      <StyledTableCell>{training.TOPICNAME}</StyledTableCell>
                      <StyledTableCell>{training.TRAINERNAME}</StyledTableCell>
                      <StyledTableCell>{training.CATEGORY}</StyledTableCell>
                      <StyledTableCell>{training.DEPARTMENT}</StyledTableCell>
                      <StyledTableCell>{training.DESIGNATION}</StyledTableCell>
                      <StyledTableCell>{training.FORMATTED_DATE}</StyledTableCell>
                      <StyledTableCell>{`${training.FROM_TRAINING_TIME} - ${training.TO_TRAINING_TIME}`}</StyledTableCell>
                      <StyledTableCell>{training.VENUE}</StyledTableCell>
                      <StyledTableCell>{training.PARTICIPANTS}</StyledTableCell>
                      <StyledTableCell>
                        <Button 
                          variant="contained" 
                          color="error"
                          onClick={() => handleCancelTraining(training.TRAININGSESSIONNO)}
                        >
                          Cancel
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={9} style={{ textAlign: 'center' }}>No upcoming trainings found</StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <div style={{display:"flex", marginLeft:"1000px", marginTop:"-343px", position:"relative"}}>
        <Button variant="contained" className="upcoming-button" onClick={() => navigate('/AdminPosttraininghistory')}>NABH Training History</Button>
      </div>
    </>
  );
}

export default AdminPostupcomingtraining;


