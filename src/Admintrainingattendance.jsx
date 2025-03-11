import React, { useState } from "react";
import './AdminDashboard.css';
import Dashboard from './Dashboard_sidebar.jsx';
import AdminNavbar from './AdminNavbar.jsx';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

function Admintrainingattendance() {
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

  function createData(Employee_Id, Name, Department,  Attendance, Date, ) {
    return { Employee_Id, Name, Department,  Attendance, Date,};
  }

  const rows = [
    // createData('John Doe', '01-01-2025', '31-12-2025', 'Medical_Documents.pdf', 'Medical Leave', 'Absent', 'N/A', 'Nursing'),
    // createData('Jane Smith', '05-02-2025', '10-02-2025', 'Leave_Request.pdf', 'Casual Leave', 'Approved', 'Urgent', 'Firing'),
    // createData('Alex Johnson', '15-03-2025', '20-03-2025', 'Sick_Note.pdf', 'Sick Leave', 'Pending', 'Verification Needed', 'Surgeon'),
    createData('NUR001', 'John Doe', 'Nursing', 'Absent', '31-12-2025'),
  ];

  const filteredRows = rows.filter(row => 
    Object.values(row).some(value => 
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <Dashboard />
      <AdminNavbar />
      <div style={{ padding: "20px", marginLeft: "260px", paddingTop: "100px" }}>
        <h2 style={{ textAlign: "center", color: "#ec2e2e" }}>Training Attendance</h2>
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
        <TableContainer component={Paper} style={{ width: "90%", margin: "auto" }}>
          <Table sx={{ minWidth: 600 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Employee_ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Department</StyledTableCell>
                <StyledTableCell>Attendance</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.Employee_Id}</StyledTableCell>
                    <StyledTableCell>{row.Name}</StyledTableCell>
                    <StyledTableCell>{row.Department}</StyledTableCell>
                    <StyledTableCell>{row.Attendance}</StyledTableCell>
                    <StyledTableCell>{row.Date}</StyledTableCell>
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

export default Admintrainingattendance;
