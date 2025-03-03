// import React, { useState, useRef } from "react"; // ✅ Correct Import
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";

// const ProfileDialog = ({ profile, isOpen, onClose }) => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const dialogRef = useRef(null);

//    // Close the dialog box when close button is clicked
//    const closeDialog = () => {
//     setIsDialogOpen(false);
//   };

//     const [formData, setFormData] = useState({
//       name: "",
//       department: "",
//       position: "",
//       email: "",
//     });

//     const handleClickOutside = (event) => {
//       if (dialogRef.current && !dialogRef.current.contains(event.target)) {
//         closeDialog();
//       }
//     };

//  {isDialogOpen && (
//         <div className="dialog-overlay">
//           <div className="dialog-box" ref={dialogRef}>
//             <button className="close-button" onClick={closeDialog}>
//               <FontAwesomeIcon icon={faTimes} />
//             </button>
//             <img src={profile} alt="Profile" className="profile-dialog-img" />
//             <form className="profile-form">
//               <label>Name:
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />
//               </label>
//               <label>Department:
//                 <input
//                   type="text"
//                   value={formData.department}
//                   onChange={(e) => setFormData({ ...formData, department: e.target.value })}
//                 />
//               </label>
//               <label>Position:
//                 <input
//                   type="text"
//                   value={formData.position}
//                   onChange={(e) => setFormData({ ...formData, position: e.target.value })}
//                 />
//               </label>
//               <label>Email ID:
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </label>
//               <button>Submit</button>
//             </form>
//           </div>
//         </div>
//       ) : null; // Hide dialog when isOpen is false
// };

// export default ProfileDialog;

import React, { useState, useRef, useEffect } from "react"; // ✅ Correct Import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ProfileDialog = ({ profile, isOpen, onClose }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
  const dialogRef = useRef(null);

  // Close the dialog box when close button is clicked
  const closeDialog = () => {
    setIsDialogOpen(false);
    onClose(); // Call the parent function to update state
  };

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    position: "",
    email: "",
  });

  // Handle clicking outside the dialog to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        closeDialog();
      }
    };

    if (isDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, );

  return isDialogOpen ? ( // ✅ Correct conditional rendering
    <div className="dialog-overlay">
      <div className="dialog-box" ref={dialogRef}>
        <button className="close-button" onClick={closeDialog}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <img src={profile} alt="Profile" className="profile-dialog-img" />
        <form className="profile-form">
          <label>
            Name:
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>
          <label>
            Department:
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </label>
          <label>
            Position:
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
          </label>
          <label>
            Email ID:
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  ) : null; // ✅ Properly return null when the dialog is closed
};

export default ProfileDialog;
