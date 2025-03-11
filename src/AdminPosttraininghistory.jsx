import { useState, useEffect } from 'react';
import * as React from 'react';
import './AdminDashboard.css';
import Dashboardsidebar from './Dashboard_sidebar.jsx';
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
import axios from 'axios';

function AdminPosttraininghistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trainingHistory, setTrainingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainingHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/training-history');
        
        if (response.data.success) {
          setTrainingHistory(response.data.data);
        } else {
          throw new Error(response.data.error || 'Failed to fetch training history');
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error fetching training history');
        setLoading(false);
        console.error('Error fetching training history:', err);
      }
    };

    fetchTrainingHistory();
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

  const filteredRows = trainingHistory.filter(row => 
    Object.values(row).some(value => 
      value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <Dashboardsidebar/> 
      <AdminNavbar/>
      <div style={{ padding: "100px", marginLeft: "200px", paddingTop: "100px" }}>
        <h2 style={{ textAlign: "center", color: "#ec2e2e" }}>NABH Training History</h2>
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
        
        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading training history...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>
        ) : (
          <TableContainer component={Paper} style={{ width: "100%", overflowX: "auto" }}>
            <Table sx={{ minWidth: 900 }} stickyHeader aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Session No</StyledTableCell>
                  <StyledTableCell>Training Topic</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell>Department</StyledTableCell>
                  <StyledTableCell>Designation</StyledTableCell>
                  <StyledTableCell>Trainer Name</StyledTableCell>
                  <StyledTableCell>Training Type</StyledTableCell>
                  <StyledTableCell>Time</StyledTableCell>
                  <StyledTableCell>Venue</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Participants</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{row.TRAININGSESSIONNO}</StyledTableCell>
                      <StyledTableCell>{row.TOPICNAME}</StyledTableCell>
                      <StyledTableCell>{row.CATEGORY}</StyledTableCell>
                      <StyledTableCell>{row.DEPARTMENT}</StyledTableCell>
                      <StyledTableCell>{row.DESIGNATION}</StyledTableCell>
                      <StyledTableCell>{row.TRAINERNAME}</StyledTableCell>
                      <StyledTableCell>{row.TRAININGTYPE}</StyledTableCell>
                      <StyledTableCell>{`${row.FROM_TRAINING_TIME} - ${row.TO_TRAINING_TIME}`}</StyledTableCell>
                      <StyledTableCell>{row.VENUE}</StyledTableCell>
                      <StyledTableCell>{row.FORMATTED_DATE}</StyledTableCell>
                      <StyledTableCell>{row.PARTICIPANTS}</StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={11} style={{ textAlign: 'center' }}>No results found</StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}

export default AdminPosttraininghistory;