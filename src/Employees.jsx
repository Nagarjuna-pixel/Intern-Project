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
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

function Employees() {
   const navigate = useNavigate(); // Initialize the navigate function
  
    // Function to handle button click and navigate to AdminPosttraining
    const handlePostClick = () => {
      navigate('/Adminnewemployee'); // This will navigate to the /admin-posttraining route
    };
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [rows, setRows] = useState([
    { Profile: "1.jpg", Employee_Id: '001', Name: 'John', Department: 'Surgical', Email_ID: 'johnwick@gmail.com', Position: 'Junior Surgeon', Schedule: 'Night Shift', JoiningDate: '01-01-25' },
    { Profile: "2.jpg", Employee_Id: '002', Name: 'Leodas', Department: 'Firing', Email_ID: 'Leodas@gmail.com', Position: 'Junior Firefighter', Schedule: 'Day Shift', JoiningDate: '01-01-25' }
  ]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      textAlign: "center",
      fontWeight: "bold",
      padding: "10px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: "center",
      padding: "10px",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter(rowId => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows.map(row => row.Employee_Id));
    }
    setSelectAll(!selectAll);
  };

  const handleEditClick = (id) => {
    setEditingRow(id);
  };

  const handleSaveClick = () => {
    setEditingRow(null);
  };

  const handleChange = (e, field, id) => {
    setRows(rows.map(row =>
      row.Employee_Id === id ? { ...row, [field]: e.target.value } : row
    ));
  };

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
        <h2 style={{ textAlign: "center", color: "#ec2e2e" }}>Employees Data</h2>
        <br /><br />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '50px' }}>
          <Button variant="contained" onClick={handleSelectAll}>
            {selectAll ? "Deselect All" : "Select All"}
          </Button>
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
        <TableContainer component={Paper} style={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ minWidth: 900 }} stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Select</StyledTableCell>
                <StyledTableCell>Profile</StyledTableCell>
                <StyledTableCell>Employee ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Department</StyledTableCell>
                <StyledTableCell>Email ID</StyledTableCell>
                <StyledTableCell>Position</StyledTableCell>
                <StyledTableCell>Schedule</StyledTableCell>
                <StyledTableCell>Joining Date</StyledTableCell>
                <StyledTableCell>Edit</StyledTableCell>
                <StyledTableCell>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <StyledTableRow key={row.Employee_Id}>
                    <StyledTableCell>
                      <Checkbox
                        checked={selectedRows.includes(row.Employee_Id)}
                        onChange={() => handleCheckboxChange(row.Employee_Id)}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      {editingRow === row.Employee_Id ? (
                        <TextField value={row.Profile} onChange={(e) => handleChange(e, "Profile", row.Employee_Id)} size="small" />
                      ) : (
                        <img src={`/images/${row.Profile}`} alt="Profile" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                      )}
                    </StyledTableCell>
                    <StyledTableCell>{row.Employee_Id}</StyledTableCell>
                    <StyledTableCell>
                      {editingRow === row.Employee_Id ? (
                        <TextField value={row.Name} onChange={(e) => handleChange(e, "Name", row.Employee_Id)} size="small" />
                      ) : (
                        row.Name
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {editingRow === row.Employee_Id ? (
                        <TextField value={row.Department} onChange={(e) => handleChange(e, "Department", row.Employee_Id)} size="small" />
                      ) : (
                        row.Department
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {editingRow === row.Employee_Id ? (
                        <TextField value={row.Email_ID} onChange={(e) => handleChange(e, "Email_ID", row.Employee_Id)} size="small" />
                      ) : (
                        row.Email_ID
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {editingRow === row.Employee_Id ? (
                        <TextField value={row.Position} onChange={(e) => handleChange(e, "Position", row.Employee_Id)} size="small" />
                      ) : (
                        row.Position
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {editingRow === row.Employee_Id ? (
                        <TextField value={row.Schedule} onChange={(e) => handleChange(e, "Schedule", row.Employee_Id)} size="small" />
                      ) : (
                        row.Schedule
                      )}
                    </StyledTableCell>
                    <StyledTableCell>{row.JoiningDate}</StyledTableCell>
                    <StyledTableCell>
                      {editingRow === row.Employee_Id ? (
                        <Button variant="contained" color="primary" size="small" onClick={handleSaveClick}>
                          Save
                        </Button>
                      ) : (
                        <Button variant="contained" color="primary" size="small" onClick={() => handleEditClick(row.Employee_Id)}>
                          Edit
                        </Button>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button variant="contained" color="error" size="small">
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={9} style={{ textAlign: 'center' }}>No results found</StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Button variant="contained" className="fixed-button" style={{marginTop:"20px"}}  onClick={handlePostClick} >+ Add</Button>
    </>
  );
}

export default Employees;

