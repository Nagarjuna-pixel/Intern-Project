import React, { useState, useEffect, useRef } from "react";
import Navbar from "../src/Navbar";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const TrainingAttendance = () => {
   const [ setIsTrainingDropdownOpen] = useState(false);
   const [setIsLeaveDropdownOpen] = useState(false);
   const [ setIsResignationDropdownOpen] = useState(false);
   const leaveDropdownRef = useRef(null);
   const trainingDropdownRef = useRef(null);
   const resignationDropdownRef = useRef(null);

   const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, attendance , date, trainingCategory) {
    return { name, attendance, date, trainingCategory};
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const handleClickOutside = (event) => {
    if (leaveDropdownRef.current && !leaveDropdownRef.current.contains(event.target)) {
      setIsLeaveDropdownOpen(false);
    }
    if (trainingDropdownRef.current && !trainingDropdownRef.current.contains(event.target)) {
      setIsTrainingDropdownOpen(false);
    }
    if (resignationDropdownRef.current && !resignationDropdownRef.current.contains(event.target)) {
      setIsResignationDropdownOpen(false);
    }
  };

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    console.log("Selected Filter:", event.target.value);
  };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    });

     return (
        <div className="app-container">
          <Navbar/>
                
                <br></br>
                <br></br>
                <div className="noticeleave">
      <h2>⚠ Notice :</h2>
      <strong>Attendance-Filter: </strong>
      <select 
        id="filter" 
        className="filter-dropdown" 
        value={filter} 
        onChange={handleFilterChange}
      >
        <option value="all">All</option>
        <option value="approved">Present</option>
        <option value="pending">Absent</option>
      </select>
    </div>
           <div style={{ padding: "10px"}}>
           <h2 style={{ textAlign: "center",  color: "#ec2e2e" }}>Training Attendance Table</h2><br></br><br></br>
           <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Attendance</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Training Category</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.attendance}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.trainingCategory}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
        </div>
      );

};

export default TrainingAttendance;
