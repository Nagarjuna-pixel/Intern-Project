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

function Adminresignationhistory() {
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

  function createData(Employee_Id, Name, Department,  Email_ID, StartDate, StartdateSession, EndDate, Session, Reason, Status) {
    return { Employee_Id, Name, Department, Email_ID, StartDate, StartdateSession, EndDate, Session, Reason, Status};
  }

  const rows = [
    createData('001', 'John','Surgical', 'johnwick@gmail.com','18-02-25', 'Forenoon', '20-02-25', 'Afternoon', 'NULL', 'Accepted'),
    createData('002', 'Leodas', 'Firing', 'Leodas@gmail.com', '17-02-25', 'Forenoon', '20-02-25', 'Afternoon', 'NULL', 'Accepted'),
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
        <h2 style={{ textAlign: "center", color: "#ec2e2e" }}>Resignation History</h2>
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
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Employee_ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Department</StyledTableCell>
                <StyledTableCell>Email_ID</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>Session</StyledTableCell>
                <StyledTableCell>End Date</StyledTableCell>
                <StyledTableCell>Session</StyledTableCell>
                <StyledTableCell>Reason</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.Employee_Id}</StyledTableCell>
                    <StyledTableCell>{row.Name}</StyledTableCell>
                    <StyledTableCell>{row.Department}</StyledTableCell>
                    <StyledTableCell>{row.Email_ID}</StyledTableCell>
                    <StyledTableCell>{row.StartDate}</StyledTableCell>
                    <StyledTableCell>{row.StartdateSession}</StyledTableCell>
                    <StyledTableCell>{row.EndDate}</StyledTableCell>
                    <StyledTableCell>{row.Session}</StyledTableCell>
                    <StyledTableCell>{row.Reason}</StyledTableCell>
                    <StyledTableCell>{row.Status}</StyledTableCell>
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

export default Adminresignationhistory;
