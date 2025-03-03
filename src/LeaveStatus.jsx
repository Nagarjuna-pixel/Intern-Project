import React, { useState, } from "react";
import Navbar from "../src/Navbar";
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

const LeaveStatus = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, startdate, enddate, documents, leavecategory, leavestatus, remarks) {
    return { name, startdate, enddate, documents, leavecategory, leavestatus, remarks };
  }

  const rows = [
    createData("Frozen yoghurt", "1-1-25", "31-12-25", "Medical_Documents.pdf", "Medical Leave", "Absent", "NULL"),
    createData("LeoDas", "13-05-1972", "07-06-1999", "NULL", "Casual Leave", "Absent", "NULL"),
  ];

  // Filter table rows based on search query
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.leavecategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.leavestatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleClickOutside = useCallback((event) => {
  //   if (leaveDropdownRef.current && !leaveDropdownRef.current.contains(event.target)) {
  //     setIsLeaveDropdownOpen(false);
  //   }
  //   if (trainingDropdownRef.current && !trainingDropdownRef.current.contains(event.target)) {
  //     setIsTrainingDropdownOpen(false);
  //   }
  //   if (resignationDropdownRef.current && !resignationDropdownRef.current.contains(event.target)) {
  //     setIsResignationDropdownOpen(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [handleClickOutside]);

  return (
    <div className="app-container">
      <Navbar />
      <br />
      <br />
      <div className="noticeleave">
        <h2>⚠ Notice :</h2>
        <strong>Filter: </strong>
        <div style={{ display: "flex", justifyContent: "space-between", marginRight: "50px" }}>
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startAdornment={<SearchIcon style={{ marginRight: 5 }} />}
            style={{ border: "1px solid black", padding: "5px 10px", borderRadius: "5px", borderColor: "black", backgroundColor: "white" }}
          />
        </div>
      </div>
      <div style={{ padding: "10px" }}>
        <h2 style={{ textAlign: "center", color: "#ec2e2e" }}>Employee Leave Table</h2>
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Start Date</StyledTableCell>
                <StyledTableCell align="right">End Date</StyledTableCell>
                <StyledTableCell align="right">Documents</StyledTableCell>
                <StyledTableCell align="right">Leave Category</StyledTableCell>
                <StyledTableCell align="right">Leave Status</StyledTableCell>
                <StyledTableCell align="right">Remarks</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.startdate}</StyledTableCell>
                  <StyledTableCell align="right">{row.enddate}</StyledTableCell>
                  <StyledTableCell align="right">{row.documents}</StyledTableCell>
                  <StyledTableCell align="right">{row.leavecategory}</StyledTableCell>
                  <StyledTableCell align="right">{row.leavestatus}</StyledTableCell>
                  <StyledTableCell align="right">{row.remarks}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default LeaveStatus;
