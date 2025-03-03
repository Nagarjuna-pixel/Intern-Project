import React, { useState } from 'react';
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
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Adminresignationrequest() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate(); // Initialize the navigate function
  
    // Function to handle button click and navigate to AdminPosttraining
    const handlePostClick = () => {
      navigate('/Adminresignationhistory'); // This will navigate to the /admin-posttraining route
    };

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
  }));

  function createData(Employee_Id, Name, Department, Email_ID, StartDate, endDate, reason) {
    return { Employee_Id, Name, Department, Email_ID, StartDate, endDate, reason };
  }

  const rows = [
    createData('001', 'John', 'Surgical', 'johnwick@gmail.com', '18-02-25', '20-02-25', 'NULL'),
    createData('002', 'Leodas', 'Firing', 'Leodas@gmail.com', '17-02-25', '19-02-25', 'NULL'),
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
      <div style={{ padding: "15px", marginLeft: "260px", paddingTop: "100px" }}>
        <h2 style={{ textAlign: "center", color: "#ec2e2e" }}>Resignation Request</h2>
        <br /><br />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '50px' }}>
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startAdornment={<SearchIcon style={{ marginRight: 5 }} />}
            style={{ border: "1px solid black", padding: "5px 10px", borderRadius: "5px" }}
          />
        </div>
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
                <StyledTableCell>End Date</StyledTableCell>
                <StyledTableCell>Reason</StyledTableCell>
                <StyledTableCell>Accepted</StyledTableCell>
                <StyledTableCell>Rejected</StyledTableCell>
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
                    <StyledTableCell>{row.endDate}</StyledTableCell>
                    <StyledTableCell>{row.reason}</StyledTableCell>
                    <StyledTableCell>
                      <Button variant="contained" style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}>Accepted</Button>
                    </StyledTableCell>
                    <StyledTableCell> <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>Rejected</Button> </StyledTableCell>
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
      <Button variant="contained" className="fixed-button"  onClick={handlePostClick} >Resignation History</Button>
    </>
  );
}

export default Adminresignationrequest;

