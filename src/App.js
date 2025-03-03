
import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";  // Import BrowserRouter
import { UserProvider } from './contexts/UserContext'; 
import Home from './Home';  
import './styles.css';
import ApplyLeave from './ApplyLeave'; // Your ApplyLeave component
import LeaveStatus from './LeaveStatus';
import Training from "./Training";
import TrainingAttendance from "./TrainingAttendance";
import ApplyResignation from "./Apply_Resignation";
import ResignationStatus from "./Resignation_Status";
import AdminDashboard from "./AdminDashboard"; 
import Employees from "./Employees"; 
import EmployeeAttendance from "./EmployeeAttendance"; 
import Adminapplyleave from "./Adminapplyleave";
import Adminleaverequest from "./Adminleaverequest";  
import Adminleavehistory from "./Adminleavehistory";  
import Admintrainingattendance from "./Admintrainingattendance"; 
import Admintrainingfeedback from "./Admintrainingfeedback";
import Adminapplyresignation from "./Adminapplyresignation";  
import Admintrainingschedule from "./Admintrainingschedule";
import Admintrainingscheduledetails from "./Admintrainingscheduledetails";
import Adminresignationrequest from "./Adminresignationrequest";
import AdminPosttraining from "./AdminPosttraining";
import Admintrainingfeedbackhistory from "./Admintrainingfeedbackhistory";
import AdminResignationhistory from "./Adminresignationhistory";
import TrainingFeedback from "./TrainingFeedback";
import Usertrainingfeedbackhistory from "./Usertrainingfeedbackhistory";
import Adminnewemployee from "./Adminnewemployee";
import AdminPosttraininghistory from "./AdminPosttraininghistory";
import Login from "./Login";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";



function App() {
    return (
      <><UserProvider><BrowserRouter>  {/* Wrap your Routes with BrowserRouter */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/Adminnewemployee" element={<Adminnewemployee />} />
          <Route path="/EmployeeAttendance" element={<EmployeeAttendance />} />
          <Route path="/Adminapplyleave" element={<Adminapplyleave />} />
          <Route path="/Adminleaverequest" element={<Adminleaverequest />} />
          <Route path="/Adminleavehistory" element={<Adminleavehistory />} />
          <Route path="/Admintrainingattendance" element={<Admintrainingattendance />} />
          <Route path="/Admintrainingfeedback" element={<Admintrainingfeedback />} />
          <Route path="/Admintrainingfeedbackhistory" element={<Admintrainingfeedbackhistory />} />
          <Route path="/Adminapplyresignation" element={<Adminapplyresignation />} />
          <Route path="/Adminresignationrequest" element={<Adminresignationrequest/>} />
          <Route path="/Admintrainingschedule" element={<Admintrainingschedule />} />
          <Route path="/Admintrainingscheduledetails" element={<Admintrainingscheduledetails />} />
          <Route path="/AdminPosttraining" element={<AdminPosttraining />} />
          <Route path="/AdminPosttraininghistory" element={<AdminPosttraininghistory />} />
          <Route path="/Adminresignationhistory" element={<AdminResignationhistory />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ApplyLeave" element={<ApplyLeave />} />
          <Route path="/LeaveStatus" element={<LeaveStatus />} />
          <Route path="/Training" element={<Training />} />
          <Route path="/TrainingAttendance" element={<TrainingAttendance />} />
          <Route path="/TrainingFeedback" element={<TrainingFeedback />} />
          <Route path="/Usertrainingfeedbackhistory" element={<Usertrainingfeedbackhistory/>} />
          <Route path="/Apply_Resignation" element={<ApplyResignation />} />
          <Route path="/Resignation_Status" element={<ResignationStatus />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      </UserProvider>
     </>
    );
}

export default App;
