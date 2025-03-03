// import React, { useState } from 'react';
// import './AdminDashboard.css';
// import Dashboard from './Dashboard_sidebar.jsx';
// import AdminNavbar from './AdminNavbar.jsx';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import { useNavigate } from 'react-router-dom';

// function Adminleaverequest() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const navigate = useNavigate();

//   const handlePostClick = () => {
//     navigate('/Adminleavehistory');
//   };

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//       textAlign: "center",
//       fontWeight: "bold",
//       padding: "10px",
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//       textAlign: "center",
//       padding: "10px",
//     },
//   }));

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover,
//     },
//   }));

//   function createData(Employee_Id, Name, Department, Email_ID, leave_category, StartDate, Starting_Session, endDate, end_Session, reason) {
//     return { Employee_Id, Name, Department, Email_ID, leave_category, StartDate, Starting_Session, endDate, end_Session, reason };
//   }

//   const rows = [
//     createData('001', 'John', 'Surgical', 'johnwick@gmail.com', 'Casual Leave', '18-02-25', 'Forenoon', '20-02-25', 'Afternoon', 'Function'),
//     createData('002', 'Leodas', 'Firing', 'Leodas@gmail.com', 'Medical Leave', '17-02-25', 'Forenoon', '19-02-25', 'Afternoon', 'Fever'),
//   ];

//   const filteredRows = rows.filter(row => 
//     Object.values(row).some(value => 
//       value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   const handleCheckboxChange = (Employee_Id) => {
//     setSelectedRows((prevSelected) =>
//       prevSelected.includes(Employee_Id)
//         ? prevSelected.filter((id) => id !== Employee_Id)
//         : [...prevSelected, Employee_Id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(filteredRows.map(row => row.Employee_Id));
//     }
//     setSelectAll(!selectAll);
//   };

//   return (
//     <> 
//       <Dashboard /> 
//       <AdminNavbar /> 
//       <div style={{ padding: "15px", marginLeft: "260px", paddingTop: "100px" }}>
//         <h2 style={{ textAlign: "center", color: "#ec2e2e" }}>Leave Request</h2>
//         <br /><br />
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '50px' }}>
//           <Button variant="contained" onClick={handleSelectAll}>
//             {selectAll ? "Deselect All" : "Select All"}
//           </Button>
//           <InputBase
//             placeholder="Search…"
//             inputProps={{ 'aria-label': 'search' }}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             startAdornment={<SearchIcon style={{ marginRight: 5 }} />}
//             style={{ border: "1px solid black", padding: "5px 10px", borderRadius: "5px" }}
//           />
//         </div>
//         <br /><br />
//         <TableContainer component={Paper} style={{ width: "100%", overflowX: "auto" }}>
//           <Table sx={{ minWidth: 800 }} stickyHeader aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell style={{ minWidth: "50px" }}>
//                   <Checkbox 
//                     checked={selectAll} 
//                     onChange={handleSelectAll} 
//                   />
//                 </StyledTableCell>
//                 <StyledTableCell style={{ minWidth: "100px" }}>Employee_ID</StyledTableCell>
//                 <StyledTableCell style={{ minWidth: "150px" }}>Name</StyledTableCell>
//                 <StyledTableCell style={{ minWidth: "150px" }}>Department</StyledTableCell>
//                 <StyledTableCell style={{ minWidth: "200px" }}>Email_ID</StyledTableCell>
//                 <StyledTableCell style={{ minWidth: "150px" }}>Leave Category</StyledTableCell>
//                 <StyledTableCell style={{ minWidth: "150px" }}>Start Date</StyledTableCell>
//                 <StyledTableCell style={{ minWidth: "150px" }}>Starting Session</StyledTableCell>
//                 <StyledTableCell style={{ minWidth: "150px" }}>End Date</StyledTableCell>
//                 <StyledTableCell style={{ minWidth: "150px" }}>End Session</StyledTableCell>
//                 <StyledTableCell style={{ minWidth: "200px" }}>Reason</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredRows.length > 0 ? (
//                 filteredRows.map((row) => (
//                   <StyledTableRow key={row.Employee_Id}>
//                     <StyledTableCell>
//                       <Checkbox
//                         checked={selectedRows.includes(row.Employee_Id)}
//                         onChange={() => handleCheckboxChange(row.Employee_Id)}
//                       />
//                     </StyledTableCell>
//                     <StyledTableCell>{row.Employee_Id}</StyledTableCell>
//                     <StyledTableCell>{row.Name}</StyledTableCell>
//                     <StyledTableCell>{row.Department}</StyledTableCell>
//                     <StyledTableCell>{row.Email_ID}</StyledTableCell>
//                     <StyledTableCell>{row.leave_category}</StyledTableCell>
//                     <StyledTableCell>{row.StartDate}</StyledTableCell>
//                     <StyledTableCell>{row.Starting_Session}</StyledTableCell>
//                     <StyledTableCell>{row.endDate}</StyledTableCell>
//                     <StyledTableCell>{row.end_Session}</StyledTableCell>
//                     <StyledTableCell>{row.reason}</StyledTableCell>
//                   </StyledTableRow>
//                 ))
//               ) : (
//                 <StyledTableRow>
//                   <StyledTableCell colSpan={11} style={{ textAlign: 'center' }}>No results found</StyledTableCell>
//                 </StyledTableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "20px", marginRight: "50px" }}>
//           <Button variant="contained" style={{ backgroundColor: 'green', color: 'white', marginRight: "10px" }}>
//             Accepted
//           </Button>
//           <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
//             Rejected
//           </Button>
//         </div>
//       </div>
//       <Button variant="contained" className="fixed-button" style={{ marginTop: "-200px" }} onClick={handlePostClick}>
//         Leave History
//       </Button>
//     </>
//   );
// }

// export default Adminleaverequest;

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
import { useNavigate } from 'react-router-dom';

function Adminleaverequest() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate('/Adminleavehistory');
  };

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

  function createData(Employee_Id, Name, Department, Email_ID, leave_category, Documents, StartDate, Starting_Session, endDate, end_Session, reason) {
    return { Employee_Id, Name, Department, Email_ID, leave_category, Documents, StartDate, Starting_Session, endDate, end_Session, reason };
  }

  const rows = [
    createData('001', 'John', 'Surgical', 'johnwick@gmail.com', 'Casual Leave', 'NULL', '18-02-25', 'Forenoon', '20-02-25', 'Afternoon', 'Function'),
    createData('002', 'Leodas', 'Firing', 'Leodas@gmail.com', 'Medical Leave', 'Medical_Certificate.pdf', '17-02-25', 'Forenoon', '19-02-25', 'Afternoon', 'Fever'),
  ];

  const filteredRows = rows.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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

  return (
    <>
      <Dashboard />
      <AdminNavbar />
      <div style={{ padding: "15px", marginLeft: "260px", paddingTop: "100px" }}>
        <h2 style={{ textAlign: "center", color: "#ec2e2e" }}>Employees Leave Request</h2>
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
                <StyledTableCell style={{ minWidth: "50px" }}>Select</StyledTableCell>
                <StyledTableCell style={{ minWidth: "100px" }}>Employee ID</StyledTableCell>
                <StyledTableCell style={{ minWidth: "150px" }}>Name</StyledTableCell>
                <StyledTableCell style={{ minWidth: "150px" }}>Department</StyledTableCell>
                <StyledTableCell style={{ minWidth: "200px" }}>Email ID</StyledTableCell>
                <StyledTableCell style={{ minWidth: "150px" }}>Leave Type</StyledTableCell>
                <StyledTableCell style={{ minWidth: "150px" }}>Documents</StyledTableCell>
                <StyledTableCell style={{ minWidth: "150px" }}>Start Date</StyledTableCell>
                <StyledTableCell style={{ minWidth: "150px" }}>Starting Session</StyledTableCell>
                <StyledTableCell style={{ minWidth: "150px" }}>End Date</StyledTableCell>
                <StyledTableCell style={{ minWidth: "150px" }}>End Session</StyledTableCell>
                <StyledTableCell style={{ minWidth: "200px" }}>Reason</StyledTableCell>
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
                    <StyledTableCell>{row.Employee_Id}</StyledTableCell>
                    <StyledTableCell>{row.Name}</StyledTableCell>
                    <StyledTableCell>{row.Department}</StyledTableCell>
                    <StyledTableCell>{row.Email_ID}</StyledTableCell>
                    <StyledTableCell>{row.leave_category}</StyledTableCell>
                    <StyledTableCell>{row.Documents}</StyledTableCell>
                    <StyledTableCell>{row.StartDate}</StyledTableCell>
                    <StyledTableCell>{row.Starting_Session}</StyledTableCell>
                    <StyledTableCell>{row.endDate}</StyledTableCell>
                    <StyledTableCell>{row.end_Session}</StyledTableCell>
                    <StyledTableCell>{row.reason}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={12} style={{ textAlign: 'center' }}>No results found</StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', marginRight: '50px' }}>
          <Button variant="contained" style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}>
            Accepted
          </Button>
          <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
            Rejected
          </Button>
        </div>
      </div>
      <Button variant="contained" className="fixed-button" style={{ marginTop: "-100px" }} onClick={handlePostClick}>
        Leave History
      </Button>
    </>
  );
}

export default Adminleaverequest;
