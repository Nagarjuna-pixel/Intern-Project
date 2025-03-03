// import React, { useState } from "react";
// import axios from "axios";
// import "./LOGIN.css";
// import { Form, Button, Row, Col, FloatingLabel, Spinner, Toast } from "react-bootstrap";
// import img1 from "./LOGIN2.jpg";
// import logo from "./PSG HOSPITALS LOGO.jpg";
// import { useNavigate } from "react-router-dom";

// function LOGIN() {
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errmsg, setErrmsg] = useState({ msg: "" });
//   const [showA, setShowA] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");
    
//     try {
//       // Send the login data to the backend API
//       const response = await axios.post("http://localhost:5000/login", { userId, password });

//       // If login is successful (status code 200)
//       if (response.status === 200) {
//         navigate("/home"); // Redirect to Home page if login is successful
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setErrorMsg("Invalid User ID or Password");
//         setErrmsg({ msg: "Invalid credentials. Please try again." });
//       } else {
//         setErrorMsg("An error occurred. Please try again later.");
//         setErrmsg({ msg: "Something went wrong. Please try again." });
//       }
//     } finally {
//       setLoading(false);
//       setShowA(true); // Show the toast
//     }
//   };

//   return (
//     <div className="LOGIN">
//       <div className="LOGIN_WHOLE">
//         <img src={img1} className="LOGIN_img" alt="Background" />
//         <div className="LOGIN_INNER1"></div>
//         <div className="LOGIN_INNER2">
//           {loading ? (
//             <div className="load_spinner">
//               <Spinner animation="border" variant="danger" />
//             </div>
//           ) : (
//             <div className="login_content">
//               <div className="LoginTitle">
//                 <img src={logo} className="LOGIN_tit_img" alt="PSG Hospitals" />
//                 <h5 style={{ marginTop: "10px" }}>Log in to HSIS Smart</h5>
//               </div> <br />
//               <Form className="login_content_f" onSubmit={handleSubmit}>
//                 <Row>
//                   <FloatingLabel className="mb-4" controlId="formGroupEmail" label="User ID"> </FloatingLabel><br />
//                   <Col lg={{ span: 10, offset: 1 }}>
//                     <Form.Control
//                       type="number"
//                       placeholder="Enter User ID"
//                       value={userId}
//                       onChange={(e) => setUserId(e.target.value)}
//                       isInvalid={!!errorMsg}
//                       size="lg" // Bootstrap large size
//                       style={{
//                         fontSize: "22px", // Increased font size
//                         padding: "10px", // Increased padding for bigger input field
//                         borderRadius: "10px",
//                         borderColor:"black", // Updated border radius to 20px
//                       }}
//                     />
//                     <Form.Control.Feedback type="invalid" style={{color:"red"}}>{errorMsg}</Form.Control.Feedback>
//                   </Col>
//                   <br />
//                   <FloatingLabel className="mb-4" controlId="formGroupPassword" label="Password">  </FloatingLabel><br />
//                   <Col lg={{ span: 10, offset: 1 }}>
//                     <Form.Control
//                       type="password"
//                       placeholder="Enter Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       isInvalid={!!errorMsg}
//                       size="lg" // Bootstrap large size
//                       style={{
//                         fontSize: "22px", // Increased font size
//                         padding: "10px", // Increased padding for bigger input field
//                         borderRadius: "10px",
//                         borderColor:"#000", // Updated border radius to 20px
//                       }}
//                     />
//                     <Form.Control.Feedback type="invalid" style={{color:"red"}}>{errorMsg}</Form.Control.Feedback>
//                   </Col>
//                 </Row>

//                 {/* Log In Button */}
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   size="lg" // Bootstrap large size
//                   style={{
//                     marginTop: "30px",
//                     width: "100%", // Full-width button
//                     height: "60px", // Even taller button
//                     borderRadius: "15px", // Even more rounded corners
//                     fontSize: "20px", // Larger font size
//                     padding: "15px", // Increased padding for a bigger button
//                   }}
//                 >
//                   Log In
//                 </Button>
//               </Form>
//               <h6 style={{ color: "#3f4254", marginTop: "20px" }}>Powered by PSG Hospitals || IT Team</h6>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Toast for error message */}
//       <Toast
//         show={showA}
//         onClose={() => setShowA(false)}
//         position="bottom-start"
//         style={{ position: "absolute", bottom: "20px", left: "30px" }}
//       >
//         <Toast.Header>
//           <strong className="me-auto">PSGH</strong>
//         </Toast.Header>
//         <Toast.Body>{errmsg.msg}</Toast.Body>
//       </Toast>
//     </div>
//   );
// }

// export default LOGIN;

import React, { useState } from "react";
import axios from "axios";
import "./LOGIN.css";
import { Form, Button, Row, Col, FloatingLabel, Spinner, Toast } from "react-bootstrap";
import img1 from "./LOGIN2.jpg";
import logo from "./PSG HOSPITALS LOGO.jpg";
import { useNavigate } from "react-router-dom";

function LOGIN() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errmsg, setErrmsg] = useState({ msg: "" });
  const [showA, setShowA] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // Send the login data to the backend API
      const response = await axios.post("http://localhost:5000/login", { userId, password });

      // If login is successful (status code 200)
      if (response.status === 200) {
        sessionStorage.setItem("userId",response.data.userId)
        sessionStorage.setItem("userName",response.data.userName)
        navigate("/home");

        // Store user data in state
        // Redirect to Home page if login is successful
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMsg("Invalid User ID or Password");
        setErrmsg({ msg: "Invalid credentials. Please try again." });
      } else {
        setErrorMsg("An error occurred. Please try again later.");
        setErrmsg({ msg: "Something went wrong. Please try again." });
      }
    } finally {
      setLoading(false);
      setShowA(true); // Show the toast
    }
  };

  return (
    <div className="LOGIN">
      <div className="LOGIN_WHOLE">
        <img src={img1} className="LOGIN_img" alt="Background" />
        <div className="LOGIN_INNER1"></div>
        <div className="LOGIN_INNER2">
          {loading ? (
            <div className="load_spinner">
              <Spinner animation="border" variant="danger" />
            </div>
          ) : (
            <div className="login_content">
              <div className="LoginTitle">
                <img src={logo} className="LOGIN_tit_img" alt="PSG Hospitals" />
                <h5 style={{ marginTop: "10px" }}>Log in to HSIS Smart</h5>
              </div> <br />
              <Form className="login_content_f" onSubmit={handleSubmit}>
                <Row>
                  <FloatingLabel className="mb-4" controlId="formGroupEmail" label="User ID"> </FloatingLabel><br />
                  <Col lg={{ span: 10, offset: 1 }}>
                    <Form.Control
                      type="number"
                      placeholder="Enter User ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      isInvalid={!!errorMsg}
                      size="lg" // Bootstrap large size
                      style={{
                        fontSize: "22px", // Increased font size
                        padding: "10px", // Increased padding for bigger input field
                        borderRadius: "10px",
                        borderColor:"black", // Updated border radius to 20px
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{color:"red"}}>{errorMsg}</Form.Control.Feedback>
                  </Col>
                  <br />
                  <FloatingLabel className="mb-4" controlId="formGroupPassword" label="Password">  </FloatingLabel><br />
                  <Col lg={{ span: 10, offset: 1 }}>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={!!errorMsg}
                      size="lg" // Bootstrap large size
                      style={{
                        fontSize: "22px", // Increased font size
                        padding: "10px", // Increased padding for bigger input field
                        borderRadius: "10px",
                        borderColor:"#000", // Updated border radius to 20px
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{color:"red"}}>{errorMsg}</Form.Control.Feedback>
                  </Col>
                </Row>

                {/* Log In Button */}
                <Button
                  variant="primary"
                  type="submit"
                  size="lg" // Bootstrap large size
                  style={{
                    marginTop: "30px",
                    width: "100%", // Full-width button
                    height: "60px", // Even taller button
                    borderRadius: "15px", // Even more rounded corners
                    fontSize: "20px", // Larger font size
                    padding: "15px", // Increased padding for a bigger button
                  }}
                >
                  Log In
                </Button>
              </Form>
              <h6 style={{ color: "#3f4254", marginTop: "20px" }}>Powered by PSG Hospitals || IT Team</h6>
            </div>
          )}
        </div>
      </div>

      {/* Toast for error message */}
      <Toast
        show={showA}
        onClose={() => setShowA(false)}
        position="bottom-start"
        style={{ position: "absolute", bottom: "20px", left: "30px" }}
      >
        <Toast.Header>
          <strong className="me-auto">PSGH</strong>
        </Toast.Header>
        <Toast.Body>{errmsg.msg}</Toast.Body>
      </Toast>
    </div>
  );
}

export default LOGIN;


