import React from "react";
import Navbar from "../src/Navbar";
import {
  styled,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import "./ApplyLeave.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Typography} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import Checkbox from '@mui/material/Checkbox';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff" },
  },
});

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "row", // Display items side by side
  justifyContent: "center",
  alignItems: "flex-start",
  height: "100vh",
  paddingTop: "100px", // Gap from navbar
  gap: "40px", // Space between card and form
});

const StatusCard = styled(Card)({
  backgroundColor: blueGrey[500],
  color: "white",
  padding: "20px",
  width: "30%", // Adjust card width
  minHeight: "670px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Center content vertically
  alignItems: "center", // Center content horizontally
  textAlign: "center",
});


const FormBox = styled("div")({
  backgroundColor: "#1e1e1e",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  width: "50%",
  textAlign: "center",
});

const Resignation_Status = () => {
  // const [resignationForm] = useState({
  //   name: "",
  //   employeeId: "",
  //   designation: "",
  //   fromDate: "",
  //   toDate: "",
  //   reason: "",
  // }
  //);

 

 

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
      <PageContainer>
        {/* Status Card */}
        <StatusCard>
          <CardContent>
          <Typography variant="h5" component="div" align="center">
              Approval Status
            </Typography> <br></br><br></br>
            <Typography variant="h7" align="center">HOD 1</Typography>   <Checkbox {...label} /> <br></br><br></br><br></br>
            <Typography variant="h7" >HOD 2</Typography>   <Checkbox {...label} /> <br></br><br></br><br></br>
            <Typography variant="h7" >HR</Typography>   <Checkbox {...label} /> <br></br><br></br><br></br>
            <Typography variant="h5" component="div" align="center">
              Status
            </Typography>
            <br></br><br></br>
            <Typography variant="h7" >Notice period compliance</Typography>   <Checkbox {...label} /> <br></br><br></br><br></br>
            <Typography variant="h7" >Handover of responsibilities</Typography>   <Checkbox {...label} /> <br></br><br></br><br></br>
            <Typography variant="h7" >Clearance process</Typography>   <Checkbox {...label} /> <br></br><br></br><br></br>
            <Typography variant="h7" >Final Settlement</Typography>   <Checkbox {...label} /> <br></br><br></br><br></br>
          </CardContent>
        </StatusCard>

        {/* Resignation Form */}
        <FormBox>
          <h1 style={{ color: "#ec2e2e" }}>Resignation Status</h1><br></br>
          <strong style={{color:"white",paddingRight:"500px"}}>Name : </strong><br></br><br></br><br></br><br></br>
          <strong style={{color:"white",paddingRight:"500px"}}>Employee ID : </strong><br></br><br></br><br></br><br></br>
          <strong style={{color:"white",paddingRight:"500px"}}>Designation : </strong><br></br><br></br><br></br><br></br>
          <strong style={{color:"white",paddingRight:"500px"}}>Reason : </strong><br></br><br></br><br></br><br></br>
          <strong style={{color:"white",paddingRight:"500px"}}>Status : </strong><br></br><br></br><br></br><br></br>
        </FormBox>
      </PageContainer>
    </ThemeProvider>
  );
};

export default Resignation_Status;
