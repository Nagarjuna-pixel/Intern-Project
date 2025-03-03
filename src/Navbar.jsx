// src/components/Navbar.jsx

import React, { useState,} from 'react';
import { useNavigate } from 'react-router-dom';
// import { useUser } from './contexts/UserContext'; // Import useUser hook
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import logo from './PSGhospitallogo.png';

function Navbar() {
  const navigate = useNavigate();
// Access the logged-in user from context
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElLeave, setAnchorElLeave] = useState(null);
  const [anchorElTraining, setAnchorElTraining] = useState(null);
  const [anchorElResignation, setAnchorElResignation] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleOpenLeaveMenu = (event) => setAnchorElLeave(event.currentTarget);
  const handleOpenTrainingMenu = (event) => setAnchorElTraining(event.currentTarget);
  const handleOpenResignationMenu = (event) => setAnchorElResignation(event.currentTarget);

  const handleCloseLeaveMenu = () => setAnchorElLeave(null);
  const handleCloseTrainingMenu = () => setAnchorElTraining(null);
  const handleCloseResignationMenu = () => setAnchorElResignation(null);

  const [userId] = useState(sessionStorage.getItem("userId"));
  const [userName] = useState(sessionStorage.getItem("userName"));

console.log(userId,userName)

  return (
    <AppBar position="fixed" sx={{ width: '1600px', backgroundColor: '#1976d2', top: 0 }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ justifyContent: "center" }}>
          <img src={logo} alt="Logo" width="200px" height="70px" style={{ objectFit: 'contain' }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center", marginLeft:"200px", gap: "50px" }}>
            <Button onClick={() => navigate('/home')} sx={{ color: 'white' }}>
              Home
            </Button>

            {/* Leave Dropdown */}
            <Button onClick={handleOpenLeaveMenu} sx={{ color: 'white' }}>
              Leave
            </Button>
            <Menu
              anchorEl={anchorElLeave}
              open={Boolean(anchorElLeave)}
              onClose={handleCloseLeaveMenu}
            >
              <MenuItem onClick={() => navigate('/ApplyLeave')}>Apply Leave</MenuItem>
              <MenuItem onClick={() => navigate('/LeaveStatus')}>Leave Status</MenuItem>
            </Menu>

            {/* Training Dropdown */}
            <Button onClick={handleOpenTrainingMenu} sx={{ color: 'white' }}>
              Training
            </Button>
            <Menu
              anchorEl={anchorElTraining}
              open={Boolean(anchorElTraining)}
              onClose={handleCloseTrainingMenu}
            >
              <MenuItem onClick={() => navigate('/training')}>Training</MenuItem>
              <MenuItem onClick={() => navigate('/trainingattendance')}>Training Attendance</MenuItem>
            </Menu>

            {/* Resignation Dropdown */}
            <Button onClick={handleOpenResignationMenu} sx={{ color: 'white' }}>
              Resignation
            </Button>
            <Menu
              anchorEl={anchorElResignation}
              open={Boolean(anchorElResignation)}
              onClose={handleCloseResignationMenu}
            >
              <MenuItem onClick={() => navigate('/Apply_Resignation')}>Apply Resignation</MenuItem>
              <MenuItem onClick={() => navigate('/Resignation_Status')}>Resignation Status</MenuItem>
            </Menu>
          </Box>

          {userId ? (
  <>
    <Typography sx={{ mx: 2 }}>
      Welcome, {userName + '(' + userId + ')'}
    </Typography>
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
      </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: '45px' }}
      anchorEl={anchorElUser}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
      <MenuItem onClick={() => navigate('/account')}>Account</MenuItem>
      <MenuItem onClick={() => navigate('/Home')}>Dashboard</MenuItem>
      <MenuItem onClick={() => navigate('/login')}>Logout</MenuItem>
    </Menu>
  </>
) : null}


        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
