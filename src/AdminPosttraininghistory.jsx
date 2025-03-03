import { useState, } from 'react';
import * as React from 'react';
import './AdminDashboard.css'; // Create a separate CSS file for styling
import Dashboardsidebar from './Dashboard_sidebar.jsx';
import AdminNavbar from './AdminNavbar.jsx';
import { styled, /*createTheme*/ } from '@mui/material/styles';
import Button from '@mui/material/Button';
// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import {Grid, FormLabel, OutlinedInput, Select, MenuItem, Button, styled, ThemeProvider, createTheme, } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
// import { useNavigate } from "react-router-dom";

function AdminPosttraininghistory() {
//   const darkTheme = createTheme({
//     palette: {
//       mode: "dark",
//       background: { default: "#121212", paper: "#1e1e1e" },
//       text: { primary: "#ffffff" },
//     },
//   });

//   const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

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

  function createData(Training_Type,  Trainer_Name, designation, department, Date, time, venue) {
    return { Training_Type, Trainer_Name, Date, designation, department,  time, venue};
  }

  const rows = [
    createData('Surgical operations', 'Anthonydas','Surgical','Heart Surgery','18-02-25', '9.00AM', 'B-block' ),
    createData( 'Eliminate Firing', 'Harolddas','Firing', 'Fire Extinguishing', '17-02-25', '11.00AM', 'A-block'),
  ];

  const filteredRows = rows.filter(row => 
    Object.values(row).some(value => 
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );


  return (
    <>
   <Dashboardsidebar/> 
   <AdminNavbar/>
   <div style={{ padding: "100px", marginLeft: "200px", paddingTop: "100px" }}>
        <h2 style={{ textAlign: "center", color: "#ec2e2e" }}>Post Training History</h2>
        <br /><br />
        <Search style={{ width:"200px", marginLeft:"1000px", marginTop:"-30px", borderColor:"black" }}>
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
        <TableContainer component={Paper} style={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ minWidth: 900 }} stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                
                <StyledTableCell>Training Topic</StyledTableCell>
                <StyledTableCell>Trainer Name</StyledTableCell>
                <StyledTableCell>Designation</StyledTableCell>
                <StyledTableCell>Departments</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell>Venue</StyledTableCell>
                <StyledTableCell>Cancel</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, index) => (
                  <StyledTableRow key={index}>
                    
                    <StyledTableCell>{row.Training_Type}</StyledTableCell>
                    <StyledTableCell>{row.Trainer_Name}</StyledTableCell>
                    <StyledTableCell>{row.designation}</StyledTableCell>
                    <StyledTableCell>{row.department}</StyledTableCell>
                    <StyledTableCell>{row.Date}</StyledTableCell>
                    <StyledTableCell>{row.time}</StyledTableCell>
                    <StyledTableCell>{row.venue}</StyledTableCell>
                    <StyledTableCell>
                      <Button variant="contained" color="error">
                        Cancel
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={8} style={{ textAlign: 'center' }}>No results found</StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
   </>
  );
}

export default AdminPosttraininghistory;
